const { sequelize } = require('../models');
const Container = new (require('../utils/Container.js'));

const TradeService = class {
    constructor(allModels){
        const {Item, User, Campaign, Order, Donation} = allModels;
        this.itemModel = Item;
        this.userModel = User;
        this.campaignModel = Campaign;
        this.orderModel = Order;
        this.donationModel = Donation;
        this.contracts = Container.get('contractCaller');
    }
    
    async buyItem(user, addr, itemId, orderCount, campaignId){
        try{
            let result = {};
            await sequelize.transaction( async (transaction) => { 
                const campaign = await this.campaignModel.findOne({where : { id : campaignId}});
                const item = await this.itemModel.findOne({where : {id : itemId}}, { transaction });
                if(item == null){
                    throw new Error('item does not exist');
                }
                const seller = await this.userModel.findOne({where : {id : item.userId}});
                if(seller == null)
                    throw new Error('seller does not exist');
                
                const finalPrice = item.price * orderCount;
                // 원장에 저장된 유저 campaign 잔액 가져오기
                const balance = await this.contracts.getUserBalance(user.email);//user.point ; //우선 웹서버 db에 있는값으로 성공했다 가정
                if(balance < finalPrice){
                    throw new Error("lack of balance");
                }
                if(item.stock < orderCount){
                    throw new Error("lack of item stock");
                }
                
                // blockchain 거래 트랜잭션 요청
                // 트랜잭션 키값 받기
                const txid = await this.contracts.purchase(campaign.name, seller.email, item.name, orderCount, finalPrice);
                const consumerBalance = await this.contracts.getUserBalance(user.email);//user.point - finalPrice; //원장의 구매자 point 가져오기 성공했다 가정
                const sellerBalance = await this.contracts.getUserBalance(seller.email);//seller.point + finalPrice; //원장의 판매자 point 가져오기 성공했다 가정
                
                await item.update({ stock : item.stock - orderCount}, {transaction});
                await user.update({ point : consumerBalance }, {transaction});
                await seller.update({ point : sellerBalance }, {transaction})
                await this.orderModel.create({
                    from : user.id,
                    to : item.userId,
                    itemId : item.id,
                    orderCount,
                    transactionKey : txid,
                    campaignId,
                    addr,
                }, {transaction});
              }).then(() => {
                // Committed
                result = { success : true, msg : "success"};
              }).catch(err => {
                // Rolled back
                throw new Error(err);
            });
            return result;
        } catch(err){
            console.error(err);
            return {success : false , msg : String(err)};
        }
    }

    async donate(user, campaignId, value){
        try{
            let result = {};
            await sequelize.transaction( async (transaction) => { 
                // 원장의 user point 잔액 져오기
                //const balance = user.point; // 가져왔다고 가정 
                const balance = await this.contracts.getUserBalance(user.email);
               
                if(balance < value)
                    throw new Error('lack of balance');
                const campaign = await this.campaignModel.findOne({where : {id : campaignId}}, { transaction});
                if(campaign == null)
                    throw new Error('campaign does not exist');
                const charityUser = await this.userModel.findOne({where : { id : campaign.userId}}, {transaction});    
                if(charityUser == null)
                    throw new Error('wrong campaign');
                
                // 기부 트랜잭션 요청
                // 트랜잭션 키값 저장
                const transactionId = await this.contracts.donate(user.email, campaign.name, value);//123213; // 성공 가정

                const donatorBalance = await this.contracts.getUserBalance(user.name);//user.point - value; // 원장에서 기부자 잔액 가져오기
                const campaignCurrMoney = await this.contracts.getCampaignBalance(campaign.name);//campaign.current_money + value ; //원장에서 캠페인 현재 모금액 가져오기
                const charityBalance = charityUser.point + value;
               
                await campaign.update({ current_money : campaignCurrMoney}, {transaction});
                await user.update({ point : donatorBalance}, {transaction});
                await charityUser.update({ point : charityBalance}, {transaction});

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
                throw new Error(err);
            });
            return result;
        } catch(err){
            console.error(err);
            return { success : false, msg : String(err)};
        }
    }

    async buyPoint(user, value){
        try{
            let result = {};
            await sequelize.transaction( async (transaction) => { 
                //web3 js 충전 트랜잭션 요청
                const txid = await this.contracts.chargeUser(user.email, value);
                const userBalance = await this.contracts.getUserBalance(user.email);//user.point + value //임시
                await user.update({ point : userBalance}, { transaction });   
            })
            .then(()=>{
                result = { success : true, msg : "success"};
            }).catch(err => {
                throw new Error(err);
            });
            return result;
        } catch (err) {
            console.error(err);
            return { success :false, msg : String(err)}
        }
    }

    async changePoint(user, value){
        let result = {};
        await sequelize.transaction( async (transaction) => { 
            //get balance
            const txid = await this.contracts.dischargeUser(user.email, value);
            const userBalance =  await this.contracts.getUserBalance(user.email);//user.point;
            
            await user.update({ point : userBalance}, { transaction });   
        })
        .then(()=>{
            result = { success : true, msg : "success"};
        }).catch(err => {
            throw new Error(err);
        });
        return result;
    }
};

module.exports = TradeService;
