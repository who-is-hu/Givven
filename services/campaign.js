const { Campaign } = require('../models');
const { Op } = require('sequelize');

const CampaignService =  class {
    constructor(user){
        this.user = user;
    }
    async register(campaign){
        const { name , dest_money, content, due_day} = campaign;
        try{
            let result;
            const exCampagin = await Campaign.findOne({where : { name }});
            if(!exCampagin){
                await Campaign.create({
                    name,
                    dest_money,
                    content,
                    due_day, //new Date(), //임시로 현재시간
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

    async getEndCampaigns(){
        const end_campaigns = await Campaign.findAll({
            where : {
                [Op.or] : [
                    { due_day : { [Op.gt] : new Date()} },
                    { current_money : { [Op.gte] : sequelize.col('dest_money')} },
                ]
            },
        });
        return end_campaigns;
    }
};

module.exports = CampaignService;
