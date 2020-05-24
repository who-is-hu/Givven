const { sequelize } = require('../models');

const Trade = class {
    constructor(allModels){
        const {Item, User, Campaign, Order} = allModels;
        this.itemModel = Item;
        this.userModel = User;
        this.campaignModel = Campaign;
        this.orderModel = Order;
    }
    
    async buyItem(user, itemId, orderCount, camapaignId){
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
                    camapaignId,
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
};

module.exports = Trade;
