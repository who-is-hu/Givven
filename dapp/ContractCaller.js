const fs = require('fs');
const Web3 = require('web3');
const decoder = require('abi-decoder');
const rpcaddr = 'http://127.0.0.1:8545';
const ContractAddressPath = './contractaddress.txt';
const passPath = './.secret';
const accountPath = './node0.givven.com/keystore/UTC--2020-08-31T14-58-16.298786100Z--28ed7664c338e162b13d69580c095f6281288c86'
const abiPath = './build/contracts/Givven.json';

const blockchain = class {

    //생성자에서 다 기본 셋팅
    constructor() {

        this.password = fs.readFileSync(passPath, 'utf-8').toString().trim();
        this.contractAddress = fs.readFileSync(ContractAddressPath, 'utf-8').toString().trim();
        this.provider = new Web3.providers.HttpProvider(rpcaddr);
        this.web3 = new Web3(this.provider);

        //get ethereum account
        var jsonFile = fs.readFileSync(accountPath, 'utf8');
        var jsonData = JSON.parse(jsonFile);
        this.account = '0x' + jsonData.address;

        //create abi
        jsonFile = fs.readFileSync(abiPath, 'utf8');
        jsonData = JSON.parse(jsonFile);
        this.abi = jsonData.abi;

        this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
        decoder.addABI(this.abi);
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
    setAccount(indx) {
        this.account = this.provider.getAddress(indx);
    }
    getAccount() {
        return this.account;
    }
    //for User
    //유저 추가(유저 이메일) => 리턴 : 트랜잭션 해쉬값
    async addUser(userEmail) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        await this.contract.methods.addUser(userEmail).send({ from: this.account }, function (err, result) {
            hash = result;
        });
        return hash;
    }
    //유저 잔고 조회 (유저 이메일) => 리턴 : 포인트 잔액
    async getUserBalance(userEmail) {
        let balance;
        await this.contract.methods.getBalance(userEmail).call({ from: this.account, gas: 5000000 }).then(function (result) {
            balance = result;
        });
        return balance;

    }
    //유저 포인트 충전 (유저 이메일, 충전할 포인트) => 리턴 : 트랜잭션 해쉬값
    async chargeUser(userEmail, value) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        await this.contract.methods.chargeUser(userEmail, value).send({ from: this.account }, function (err, result) {
            hash = result;
        });
        return hash;
    }
    //유저 포인트 환전 (유저 이메일, 환전할 포인트) => 리턴 : 트랜잭션 해쉬값 
    //잔액 부족시 예외 발생
    async dischargeUser(uid, value) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        try {
            await this.contract.methods.dischargeUser(uid, value).send({ from: this.account }, function (err, result) {
                hash = result;
            });
            return hash;
        }
        catch (err) {
            console.log(err);
            console.log('User don\'t have enough money');
        }
    }

    //for Campaign
    //캠페인 생성 (캠페인 고유 id, 사회 단체 이메일) => 리턴 : 트랜잭션 해쉬 값
    async createCampaign(campaignid, socialorg_Email) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        await this.contract.methods.createCampaign(campaignid, socialorg_Email).send({ from: this.account }, function (err, result) {
            hash = result;
        });
        return hash;
    }

    //기부 (기부하는 유저 이메일, 캠페인 고유 id, 기부할 포인트 액수) => 리턴 : 트랜잭션 해쉬 값 
    //잔액 부족시 예외 발생

    async donate(userEmail, campaignid, value) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        try {
            await this.contract.methods.donate(userEmail, campaignid, value).send({ from: this.account }, function (err, result) {
                hash = result;
            });
            return hash;
        }
        catch (err) {
            console.log(err);
            console.log('User don t have enough money');
        }
    }
    //캠페인 현재 모금 금액(캠페인 고유 id) => 리턴 : 캠페인 현재 모금 금액
    async getCampaignBalance(id) {
        let balance;
        await this.contract.methods.getCampaignBalance(id).call({ from: this.account }, function (err, result) {
            balance = result;
        });
        return balance;
    }

    //캠페인 생성한 단체(캠페인 고유 id) => 리턴 : 사회 단체 Email
    async getCampaignOwner(id) {
        let socialorg;
        await this.contract.methods.getCampaignOwner(id).call({ from: this.account }, function (err, result) {
            socialorg = result;
        });
        return socialorg;
    }
    //기부자가 캠페인에 모금한 액수 조회 (캠페인 고유 id, 유저 이메일) => 리턴 : 모금한 액수 (없을시 0)
    async getDonateValueByUser(campaignid, uid) {
        let value;
        await this.contract.methods.getDonateValueByUser(campaignid, uid).call({ from: this.account }, function (err, result) {
            value = result;
        });
        return value;
    }
    //캠페인으로 물건 구매(캠페인 고유 id, 판매자 이메일, 상품명 or id, 상품갯수, 총 금액) => 리턴 : 트랜잭션 해쉬 값
    async purchase(campaignid, sellerEmail, product, productNum, value) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        try {
            await this.contract.methods.purchase(campaignid, sellerEmail, product, productNum, value).send({ from: this.account }, function (err, result) {
                hash = result;
            });
        }
        catch (err) {
            console.log(err);
            console.log('campaign don\'t have enough money');
        }
        return hash;
    }
    //캠페인에서 해당 제품을 몇개샀는가(캠페인 고유 id, 제품명) => 리턴 : 구매한 제품 숫자
    async productNumByCampaign(campaignid, productName) {
        let num;
        await this.contract.methods.productNumByCampaign(campaignid, productName).call({ from: this.account }, function (err, result) {
            num = result;
        });
        return num;
    }

    //캠페인 모금액을 사회 단체 계좌로 이동(사회단체 이메일, 캠페인 고유 id) => 리턴 : 트랜잭션 해쉬 값
    //만든 이유 : 돈이 애매하게 남았을 때 필요할듯, 나중에 필요가 있을수도 있다.
    async returnRestPoint(socialorg_Email, campaignid) {
        let hash;
        await this.web3.eth.personal.unlockAccount(this.account, this.password, 600);
        await this.contract.methods.returnRestPoint(socialorg_Email, campaignid).send({ from: this.account }, function (err, result) {
            hash = result;
        });
        return hash;
    }

    //추가로 트랜잭션 해쉬로 input 값 json으로 변환하는 함수 구현
    //(매개변수 : 트랜잭션 해쉬 값) => 리턴 : json 데이터 (트랜잭션 요청 메소드명과 매개변수들이 들어가 있음);
    async getTransactionData(txHash) {
        let data;
        await this.web3.eth.getTransaction(txHash, function (error, result) {
            var rawdata = result.input;
            data = decoder.decodeMethod(rawdata);
        });
        return data;
    }

}
module.exports = blockchain;
