const { Op } = require('sequelize');
const Container = new (require('../utils/Container.js'))();

const CampaignService = class {
  constructor(campaignModel, userModel) {
    this.userModel = userModel;
    this.campaignModel = campaignModel;
    this.contracts = Container.get('contractCaller');
  }
  async register(user, campaign) {
    let { name , dest_money, content, due_day, title_img} = campaign;
    let result;

    if(title_img == null)
        title_img = "/uploads/default.jpg"
    try{
        const exCampagin = await this.campaignModel.findOne({where : { name }});
        if(exCampagin == null){
            await this.campaignModel.create({
                name,
                dest_money,
                title_img,
                content,
                owner : user.name,
                current_money : 0,
                used_money : 0,
                due_day,
                userId : user.id,
                used_money : 0,
                current_money : 0
            });
            const hash = await this.contracts.createCampaign(name, user.email );
            console.log('campaign creation', hash);
            result = {success : true, msg : '성공'};
        }
        else
            result = {success : false, msg : 'duplicate name'};
        return result;
    }
    catch(err){
        console.error(err);
        result = {success : false, msg: String(err)};
        return result;
    }
    return res.status(500).send("sorry it doesn't work");
  }

  async getUserCampaigns(user, option) {
    let searchOption = {};
    if (option == 'end') {
      searchOption = {
        where: {
          [Op.or]: [
            { due_day: { [Op.lte]: new Date() } },
            { current_money: { [Op.gte]: sequelize.col('dest_money') } },
          ],
          userId: user.id,
        },
      };
    } else if (option == 'ing') {
      searchOption = {
        where: {
          [Op.and]: [
            { due_day: { [Op.gt]: new Date() } },
            { current_money: { [Op.lt]: sequelize.col('dest_money') } },
          ],
          userId: user.id,
        },
      };
    }
    const campaigns = await user.getCampaigns(searchOption);
    return campaigns;
  }

  async getAllCampaigns(option) {
    let searchOption = {};
    if (option == 'end') {
      searchOption = {
        where: {
          [Op.or]: [
            { due_day: { [Op.lte]: new Date() } },
            { current_money: { [Op.gte]: sequelize.col('dest_money') } },
          ],
        },
      };
    } else if (option == 'ing') {
      searchOption = {
        where: {
          [Op.and]: [
            { due_day: { [Op.gt]: new Date() } },
            { current_money: { [Op.lt]: sequelize.col('dest_money') } },
          ],
        },
      };
    }
    const end_campaigns = await this.campaignModel.findAll(searchOption);
    return end_campaigns;
  }

  async getCampaignDetail(campaignId) {
    let result = {};
    const campaign = await this.campaignModel.findOne({
      where: { id: campaignId },
    });
    if (campaign == null) {
      (result.success = false), (result.msg = 'wrong id');
      return result;
    }
    return campaign;
  }
};

module.exports = CampaignService;
