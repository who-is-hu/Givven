const { Op } = require('sequelize');

const TradeLog = class {
  constructor(allModels) {
    const { Item, User, Campaign, Order, Donation } = allModels;
    this.itemModel = Item;
    this.userModel = User;
    this.campaignModel = Campaign;
    this.orderModel = Order;
    this.donationModel = Donation;
  }
  async getMyOrders(user) {
    const orders = await this.orderModel.findAll({
      where: {
        [Op.or]: [{ from: user.id }, { to: user.id }],
      },
      include: [
        {
          model: this.campaignModel,
          attributes: ['id', 'name'],
        },
        {
          model: this.itemModel,
          attributes: ['id', 'name', 'price', 'title_img'],
        },
        {
          model: this.userModel,
          as: 'seller',
          attributes: ['id', 'name'],
        },
        {
          model: this.userModel,
          as: 'consumer',
          attributes: ['id', 'name'],
        },
      ],
    });
    return orders;
  }

  async getMyDonations(user, option) {
    let searchOption;
    if (option == 'end') {
      searchOption = {
        [Op.or]: [
          { due_day: { [Op.lte]: new Date() } },
          { current_money: { [Op.gte]: sequelize.col('dest_money') } },
        ],
      };
    } else if (option == 'ing') {
      searchOption = {
        [Op.and]: [
          { due_day: { [Op.gt]: new Date() } },
          { current_money: { [Op.lt]: sequelize.col('dest_money') } },
        ],
      };
    }
    const donations = await user.getDonations({
      include: {
        model: this.campaignModel,
        where: searchOption,
      },
    });
    return donations;
  }

  async getOrdersByCampaign(campaignId) {
    const orders = await this.orderModel.findAll({
      where: { campaignId },
      include: [
        {
          model: this.userModel,
          as: 'seller',
          attributes: ['id', 'name'],
        },
        {
          model: this.userModel,
          as: 'consumer',
          attributes: ['id', 'name'],
        },
        {
          model: this.itemModel,
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
    return orders;
  }

  async getDonationsByCampaign(campaignId) {
    const donations = await this.donationModel.findAll({
      where: {
        campaignId,
      },
      include: {
        model: this.userModel,
        attributes: ['id', 'name'],
      },
    });
    return donations;
  }

  async getOrderDetail(orderId) {
    const order = await this.orderModel.findOne({
      where: { id: orderId },
      include: [
        {
          model: this.campaignModel,
          attributes: ['id', 'name'],
        },
        {
          model: this.itemModel,
          attributes: ['id', 'name', 'price'],
        },
        {
          model: this.userModel,
          as: 'seller',
          attributes: ['id', 'name'],
        },
        {
          model: this.userModel,
          as: 'consumer',
          attributes: ['id', 'name'],
        },
      ],
    });
    return order;
  }
};

module.exports = TradeLog;
