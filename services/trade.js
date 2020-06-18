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
        this.contracts = Container.get('contractCaller');

    }
    async buyItem(user, addr, itemId, orderCount, campaignId) {
        let result = {};
        await sequelize.transaction(async (transaction) => {
            const campaign = await this.campaignModel.findOne({ where: { id: campaignId } });
            const item = await this.itemModel.findOne({ where: { id: itemId } });
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
            //const campaignBalance = await this.contracts.getCampaignBalance(campaign.name);
            const sellerBalance = await this.contracts.getUserBalance(seller.email);
            //console.log(typeof (campaign.current_money - campaignBalance));
            //console.log(campaign.current_money - campaignBalance);
            await item.update({ stock: item.stock - orderCount }, { transaction });
            await user.update({point : user.point - finalPrice}, { transaction });
            await campaign.update({ used_money : campaign.used_money + finalPrice}, { transaction });
            await seller.update({ point: sellerBalance }, { transaction })
            await this.orderModel.create({
                from: user.id,
                to: item.userId,
                itemId: item.id,
                orderCount,
                transactionId: txid,
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
            const txid = await this.contracts.donate(user.email, campaign.name, value);

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
                transactionId : txid,
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
        console.log('buy point : ', txid);
        return result;
    }

    async changePoint(user, value) {
        let result = {};
        await sequelize.transaction(async (transaction) => {
            if(user.point < value){
                throw new Error('lack of balance');
            }
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
        console.log('change point : ', txid);
        return result;
    }
};

module.exports = TradeService;
