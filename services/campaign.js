const { Op } = require('sequelize');

const CampaignService =  class {
    constructor(campaignModel, userModel){
        this.userModel = userModel;
        this.campaignModel = campaignModel;
    }
    async register(user, campaign){
        let { name , dest_money, content, due_day, title_img} = campaign;
        if(title_img == null)
            title_img = "/uploads/dafault.jpg"
        try{
            let result;
            const exCampagin = await this.campaignModel.findOne({where : { name }});
            if(!exCampagin){
                await Campaign.create({
                    name,
                    dest_money,
                    title_img,
                    content,
                    owner : user.name,
                    due_day, //new Date(), //임시로 현재시간
                    userId : user.id
                });
                result = {success : true, msg : '성공'};
            } else 
                result = {success : false, msg: '이미 존재하는 Campaing 이름'};
            
            return result;
        }
        catch(err){
            console.error(err);
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
};

module.exports = CampaignService;
