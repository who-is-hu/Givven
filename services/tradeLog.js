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

    async getMyDonations(user, option){ //end, ing
        try{
            let searchOption;
            if(option == 'end'){
                searchOption = { 
                        [Op.or] : [
                            { due_day : { [Op.lte] : new Date()} },
                            { current_money : { [Op.gte] : sequelize.col('dest_money')} },
                        ],
                }
            } else if( option == 'ing'){
                searchOption = { 
                        [Op.and] : [
                            { due_day : { [Op.gt] : new Date()} },
                            { current_money : { [Op.lt] : sequelize.col('dest_money')} },
                        ],
                }
            }
            const donations = await user.getDonations({
                include : {
                    model : this.campaignModel,
                    where : searchOption,                  
                },
            });
            return { data : donations , msg : "success"}
        } catch (err) {
            console.error(err);
            return { success : false, msg : String(err)};
        }
    }

    async getOrdersByCampaign(campaignId){
        try{
            const orders = await this.orderModel.findAll({where : {campaignId}});
            return orders;
        } catch (err) {
            console.error(err);
            return {success: false, msg : String(err)};
        }
    }

    async getDonationsByCampaign(campaignId){
        try{
            const donations = await this.donationModel.findAll({where : { campaignId}});
            return donations;
        } catch (err) {
            console.error(err);
            return { success : false, msg : String(err)};
        }
    }
    async getOrderDetail(orderId){
        try{
            const order = await this.orderModel.findOne({ 
                where : { id : orderId},
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
            return  order;
        } catch (err) {
            console.error(err);
            return { success : false, msg : String(err)};
        }
    }
};

module.exports = TradeLog;