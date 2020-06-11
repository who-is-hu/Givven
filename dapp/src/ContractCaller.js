const fs = require('fs');

const blockchain = class {

    constructor(path) {
        var jsonFile = fs.readFileSync(path, 'utf8');
        var jsonData = JSON.parse(jsonFile);
        this.web3 = null;
        this.account = '';
        this.contract = null;
        this.provider = null;
        this.abi = jsonData.abi;;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    getProvider() {
        this.provider;
    }
    setweb3(web3) {
        this.web3 = web3;
    }
    getweb3() {
        return this.web3;
    }
    setAbi(abi) {
        this.abi = abi;
    }
    getAbi() {
        return this.abi;
    }
    setContract(contractAddress) {
        this.contract = new this.web3.eth.Contract(this.abi, contractAddress);
    }
    getContract() {
        return this.contract;
    }
    setAccount(account) {
        this.account = account;
    }
    getAccount() {
        return this.account;
    }

    //for User
    async addUser(uid) {
        let hash;
        await this.contract.methods.addUser(uid).send({ from: this.account }, function (err, result) {
            hash = result;
        });
        console.log(hash);
        return hash;
    }

    async getUserBalance(uid) {
        let balance;
        await this.contract.methods.getBalance(uid).call({ from: this.account }).then(function (result) {
            balance = result;
        })
        return balance;
    }

    async chargeUser(uid, value) {
        let hash;
        await this.contract.methods.chargeUser(uid, value).send({ from: this.account }, function (err, result) {
            hash = result;
        })
        return hash;
    }

    async dischargeUser(uid, value) {
        let hash;
        try {
            await this.contract.methods.dischargeUser(uid, value).send({ from: this.account }, function (err, result) {
                hash = result;
            })
            return hash;
        }
        catch (err) {
            console.log(err);
            console.log('User don t have enough money');
        }
    }

    //for Campaign
    async createCampaign(id, socialorg) {
        let hash;
        await this.contract.methods.createCampaign(id, socialorg).send({ from: this.account }, function (err, result) {
            hash = result;
        })
        return hash;
    }

    async donate(uid, campaignid, val) {
        let hash;
        try {
            await this.contract.methods.donate(uid, campaignid, val).send({ from: this.account }, function (err, result) {
                hash = result;
            })
            return hash;
        }
        catch (err) {
            console.log(err);
            console.log('User don t have enough money');
        }
    }

    async getCampaignBalance(id) {
        let balance;
        await this.contract.methods.getCampaignBalance(id).call({ from: this.account }, function (err, result) {
            balance = result;
        })
        return balance;
    }
    async getCampaignOwner(id) {
        let socialorg;
        await this.contract.methods.getCampaignOwner(id).call({ from: this.account }, function (err, result) {
            socialorg = result;
        })
        return socialorg;
    }
    async getDonateValueByUser(campaignid, uid) {
        let value;
        await this.contract.methods.getDonateValueByUser(campaignid, uid).call({ from: this.account }, function (err, result) {
            value = result;
        })
        return value;
    }

}
module.exports = blockchain;