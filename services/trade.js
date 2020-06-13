const { sequelize } = require('../models');
const Container = new (require('../utils/Container.js'));

const TradeService = class {
    constructor(allModels) {
        const { Item, User, Campaign, Order, Donation } = allModels;
        this.itemModel = Item;
        this.userModel = User;
        this.campaignModel = Campaign;
        this.orderModel = Order;
        this.donationModel = Donation;
    }
    async setContranctCaller() {
        this.contracts = await Container.get('contractCaller');
    }
    async buyItem(user, addr, itemId, orderCount, campaignId) {
        let result = {};
        await sequelize.transaction(async (transaction) => {
            await this.setContranctCaller();
            const campaign = await this.campaignModel.findOne({ where: { id: campaignId } });
            const item = await this.itemModel.findOne({ where: { id: itemId } }, { transaction });
            if (item == null) {
                throw new Error('item does not exist');
            }
            const seller = await this.userModel.findOne({ where: { id: item.userId } });
            if (seller == null)
                throw new Error('seller does not exist');

            const finalPrice = item.price * orderCount;
            const balance = await this.contracts.getCampaignBalance(campaign.name);
            if (balance < finalPrice) {
                throw new Error("lack of balance");
            }
            if (item.stock < orderCount) {
                throw new Error("lack of item stock");
            }

            // blockchain 거래 트랜잭션 요청
            const txid = await this.contracts.purchase(campaign.name, seller.email, item.name, orderCount, finalPrice);
            const campaignBalance = await this.contracts.getCampaignBalance(user.email);
            const sellerBalance = await this.contracts.getUserBalance(seller.email);

            await item.update({ stock: item.stock - orderCount }, { transaction });
            await user.update({point : user.point - value});
            await campaign.update({ used_money : campaign.current_money - campaignBalance}, { transaction });
            await seller.update({ point: sellerBalance }, { transaction })
            await this.orderModel.create({
                from: user.id,
                to: item.userId,
                itemId: item.id,
                orderCount,
                transactionKey: txid,
                campaignId,
                addr,
            }, { transaction });
        }).then(() => {
            // Committed
            result = { success: true, msg: "success" };
        }).catch(err => {
            // Rolled back
            console.error(err);
            result = { success: false, msg: String(err) };
        });
        return result;

    }

    async donate(user, campaignId, value) {
        let result = {};
        await sequelize.transaction(async (transaction) => {
            await this.setContranctCaller();
            // 원장의 user point 잔액 져오기
            //const balance = user.point; // 가져왔다고 가정 
            const balance = await this.contracts.getUserBalance(user.email);

            if (balance < value)
                throw new Error('lack of balance');
            const campaign = await this.campaignModel.findOne({ where: { id: campaignId } }, { transaction });
            if (campaign == null)
                throw new Error('campaign does not exist');
            const charityUser = await this.userModel.findOne({ where: { id: campaign.userId } }, { transaction });
            if (charityUser == null)
                throw new Error('wrong campaign');

            // 기부 트랜잭션 요청
            // 트랜잭션 키값 저장
            const transactionId = await this.contracts.donate(user.email, campaign.name, value);

            const donatorBalance = await this.contracts.getUserBalance(user.name);
            const campaignCurrMoney = await this.contracts.getCampaignBalance(campaign.name);
            const charityBalance = charityUser.point + value;

            await campaign.update({ current_money: campaignCurrMoney }, { transaction });
            await user.update({ point: donatorBalance }, { transaction });
            await charityUser.update({ point: charityBalance }, { transaction });

            const donation = await this.donationModel.create({
                userId: user.id,
                campaignId,
                value,
                transactionId,
            }, { transaction });
            if (donation == null) {
                throw new Error('create donation log failed');
            }
        }).then(() => {
            // Committed
            result = { success: true, msg: "success" };
        }).catch(err => {
            // Rolled back
            console.error(err);
            result = { success: false, msg: String(err) };
            throw new Error(err);
        });
        return result;
    }

    async buyPoint(user, value) {
        let result = {};
        await sequelize.transaction(async (transaction) => {
            await this.setContranctCaller();
            const txid = await this.contracts.chargeUser(user.email, value);
            const userBalance = await this.contracts.getUserBalance(user.email);
            await user.update({ point: userBalance }, { transaction });
            console.log('buy point', txid);
        }).then(() => {
            result = { success: true, msg: "success" };
        }).catch(err => {
            console.error(err);
            result = { success: false, msg: String(err) }
        });
        return result;
    }

    async changePoint(user, value) {
        let result = {};
        
        await sequelize.transaction(async (transaction) => {
            if(user.point < value){
                throw new Error('lack of balance');
            }
            await this.setContranctCaller();
            const txid = await this.contracts.dischargeUser(user.email, value);
            const userBalance = await this.contracts.getUserBalance(user.email);
            await user.update({ point: userBalance }, { transaction });
            console.log('change point', txid);

        }).then(() => {
            result = { success: true, msg: "success" };
        }).catch(err => {
            console.error(err);
            result = { success: false, msg: String(err) };
        });
        return result;
    }
};

module.exports = TradeService;
