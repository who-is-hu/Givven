const { Op } = require('sequelize');

const CampaignService =  class {
    constructor(campaignModel, userModel){
        this.userModel = userModel;
        this.campaignModel = campaignModel;
    }
    async register(user, campaign){
        let { name , dest_money, content, due_day, title_img} = campaign;
        let result;

        if(title_img == null)
            title_img = "/uploads/default.jpg"
        try{
            const exCampagin = await this.campaignModel.findOne({where : { name }});
            if(!exCampagin){
                await this.campaignModel.create({
                    name,
                    dest_money,
                    title_img,
                    content,
                    owner : user.name,
                    due_day, //new Date(), //임시로 현재시간
                    userId : user.id
                });
                result = {success : true, msg : '성공'};
            }            
            return result;
        }
        catch(err){
            console.error(err);
            result = {success : false, msg: String(err)};
            return result;
        }
    }

    async getUserCampaigns(user, option){
        try{
            let searchOption = {};
            if(option == 'end'){
                searchOption = { 
                    where : {
                        [Op.or] : [
                            { due_day : { [Op.lte] : new Date()} },
                            { current_money : { [Op.gte] : sequelize.col('dest_money')} },
                        ],
                        userId : user.id
                    }
                }
            } else if( option == 'ing'){
                searchOption = { 
                    where : {
                        [Op.and] : [
                            { due_day : { [Op.gt] : new Date()} },
                            { current_money : { [Op.lt] : sequelize.col('dest_money')} },
                        ],
                        userId : user.id
                    }   
                }
            }
            const campaigns = await user.getCampaigns(searchOption);
            return campaigns;
        }catch(err) {
            console.error(err);
        }
    }

    async getAllCampaigns(option){
        try{
            let searchOption = {};
            if(option == 'end'){
                searchOption = { 
                    where : {
                        [Op.or] : [
                         { due_day : { [Op.gt] : new Date()} },
                         { current_money : { [Op.gte] : sequelize.col('dest_money')} },
                    ]}
                }
            } else if( option == 'ing'){
                searchOption = { 
                    where : {
                        [Op.and] : [
                         { due_day : { [Op.lte] : new Date()} },
                         { current_money : { [Op.lt] : sequelize.col('dest_money')} },
                    ]}
                }
            }
            const end_campaigns = await this.campaignModel.findAll(searchOption);
            return end_campaigns;
        } catch (err) {
            console.error(err);
        }   
    }

    async getCampaignDetail(campaignId){
        try{
            let result = {};
            const campaign = await this.campaignModel.findOne({where : {id : campaignId}});
            if(campaign == null){
                result.success = false,
                result.msg = "wrong id"
                return result;
            }
            return campaign;
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = CampaignService;
