const { Campaign } = require('../models');

const CampaignService =  class {
    constructor(user){
        this.user = user;
    }
    async register(campaign){
        const { name , dest_money, current_money, content, due_day} = campaign;
        try{
            const exCampagin = await Campaign.findOne({
                where : {
                    name
                }
            });
            if(exCampagin){
                return {success : false, msg: '이미 존재하는 Campaing 이름'};
            }
            await Campaign.create({
                name,
                dest_money,
                current_money : 0,
                content,
                due_day,
                userId : this.user.id
            });
            return {success : true, msg : '성공'};
        }
        catch(err){
            console.error(err);
        }
    }
};

module.exports = CampaignService;
