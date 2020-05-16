const { Campaign, User } = require('../models');

const CampaignService =  class {
    constructor(user){
        this.user = user;
    }
    async register(campaign){
        const { name , dest_money, content, due_day} = campaign;
        try{
            let result;
            const exCampagin = await Campaign.findOne({
                where : {
                    name
                }
            });
            if(!exCampagin){
                await Campaign.create({
                    name,
                    dest_money,
                    content,
                    due_day,
                    userId : this.user.id
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

    async getMyCampaigns(){
        const campaigns = await this.user.getCampaigns();
        return campaigns;
    }
};

module.exports = CampaignService;
