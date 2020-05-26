const { sequelize } = require('../models');

const TradeService = class {
    constructor(allModels){
        const {Item, User, Campaign, Order, Donation} = allModels;
        this.itemModel = Item;
        this.userModel = User;
        this.campaignModel = Campaign;
        this.orderModel = Order;
        this.donationModel = Donation;
    }
    
    async buyItem(user, itemId, orderCount, campaignId){
        try{
            let result = {};
            await sequelize.transaction( async (transaction) => { 
                const item = await this.itemModel.findOne({where : {id : itemId}}, { transaction });
                if(item == null){
                    throw new Error('item does not exist');
                }

                //blance 가져오기
                let balanceEth = 1000000; // 성공 가정
                if(balanceEth < item.price * orderCount){
                    throw new Error("lack of balance eth");
                }
                if(item.stock < orderCount){
                    throw new Error("lack of item stock");
                }
                
                // blockchain 거래 트랜잭션 요청
                // 트랜잭션 결과 확인
                // 트랜잭션 키값 받기
                const transactionId = 1234; //성공 가정
                
                await item.update({ stock : item.stock - orderCount}, {transaction});
                await this.orderModel.create({
                    from : user.id,
                    to : item.userId,
                    itemId : item.id,
                    orderCount,
                    transactionKey : transactionId,
                    campaignId,
                }, {transaction});
              }).then(() => {
                // Committed
                result = { success : true, msg : "success"};
              }).catch(err => {
                // Rolled back
                result = { success : false, msg : err};
                throw new Error(err);
            });
            return result;
        } catch(err){
            console.error(err);
        }
    }

    async donate(user, campaignId, value){
        try{
            let result = {};
            await sequelize.transaction( async (transaction) => { 
                // 기부 트랜잭션 요청
                // 트랜잭션 결과 
                const transactionId = 123213; // 성공 가정
               
                const campaign = await this.campaignModel.findOne({where : {id : campaignId}}, { transaction});
                if(campaign == null){
                   throw new Error('campaign does not exist');
                }
                await campaign.update({ current_money : campaign.current_money + value}, {transaction});
            
                const donation = await this.donationModel.create({
                    userId : user.id,
                    campaignId,
                    value,
                    transactionId,
                }, {transaction});
                if(donation == null){
                    throw new Error('create donation log failed');
                }
            }).then(() => {
                // Committed
                result = { success : true, msg : "success"};
              }).catch(err => {
                // Rolled back
                result = { success : false, msg : err};
                throw new Error(err);
            });
            return result;
        } catch(err){
            console.error(err);
        }
    }
};

module.exports = TradeService;
