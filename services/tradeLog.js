const { Op } = require('sequelize');

const TradeLog = class {
    constructor(allModels){
        const {Item, User, Campaign, Order, Donation} = allModels;
        this.itemModel = Item;
        this.userModel = User;
        this.campaignModel = Campaign;
        this.orderModel = Order;
        this.donationModel = Donation;
    }
    async getMyOrders(user){
        try{
            const orders = await this.orderModel.findAll({
                where : { 
                    [Op.or] : [
                        {from : user.id},
                        {to : user.id},
                    ]
                },
                include : [
                    {
                        model : this.campaignModel,
                        attributes : [ 'id' , 'name' ]
                    },
                    {
                        model : this.itemModel,
                        attributes : [ 'id' , 'name' ]
                    },
                    {
                        model : this.userModel,
                        as : 'seller',
                        attributes : [ 'id' , 'name' ]
                    },
                    {
                        model : this.userModel,
                        as : 'consumer',
                        attributes : [ 'id' , 'name' ]
                    }
                ]               
            });
            return orders;
        } catch (err) {
            console.error(err);
            return { success : false, msg : err};
        }
    }

    async getMyDonations(){

    }

    async getOrdersByCampaign(){

    }

    async getDonationsByCampaign(){

    }
};

module.exports = TradeLog;