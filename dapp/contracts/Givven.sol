pragma solidity > 0.4.17;

contract Givven{

    address admin;
    mapping(string => uint) accounts;
    mapping(string => Campaign) campaigns;

    struct Campaign{
        string socialOrg;
        uint currentDonate;

        mapping(string => uint) donatevalue;
        mapping(string => uint) products;
    }

    //contructor
    constructor() public {
        admin = msg.sender;
    }
    //modifier
    modifier onlyGivven{
        require(msg.sender == admin);
        _;
    }
    //Service End
    function serviceEnd() public onlyGivven{
        require(admin == msg.sender);
        selfdestruct(msg.sender);
    }

    //-----------User Method-------------
    function addUser(string memory _userEmail) public{
        accounts[_userEmail] = 0;
    }

    function getBalance(string memory _userEmail) public view returns (uint){
        return accounts[_userEmail];
    }

    function chargeUser(string memory _userEmail, uint _point) public onlyGivven {
        accounts[_userEmail] += _point;
    }

    function dischargeUser(string memory _userEmail, uint _point) public onlyGivven{
        require(accounts[_userEmail] > _point);
        accounts[_userEmail] -= _point;
    }

    //----------Campaign Method--------------
    function createCampaign(string memory _campaignId, string memory _socialOrg) public {
        Campaign  memory newcampaign = Campaign(_socialOrg,0);
        campaigns[_campaignId] = newcampaign;
    }
   
    function donate(string memory _userEmail, string memory _campaignId, uint _value) public {
        require(accounts[_userEmail] >= _value);
        accounts[_userEmail] -= _value;
        campaigns[_campaignId].currentDonate += _value;
        campaigns[_campaignId].donatevalue[_userEmail] += _value;
    }

    function getCampaignBalance(string memory _campaignId) public view returns (uint){
        return campaigns[_campaignId].currentDonate;
    }

    function getCampaignOwner(string memory _campaignId) public view returns (string memory){
        return campaigns[_campaignId].socialOrg;
    }

    function getDonateValueByUser(string memory _campaignId,string memory _userEmail) public view returns (uint ){
        return campaigns[_campaignId].donatevalue[_userEmail];
    }

    function purchase(string memory _campaignId, string memory _seller, string memory _product,uint _productNum, uint _value) public {
        require(campaigns[_campaignId].currentDonate >= _value);
        campaigns[_campaignId].currentDonate -= _value;
        accounts[_seller] += _value;
        campaigns[_campaignId].products[_product] += _productNum;
    }

    function productNumByCmapaign(string memory _campaignId,string memory _product) public view returns (uint){
        return campaigns[_campaignId].products[_product];
    }

    function returnRestPoint(string memory _socialOrg, string memory _campaignId) public {
        accounts[_socialOrg] += campaigns[_campaignId].currentDonate;
        campaigns[_campaignId].currentDonate = 0;
    }
}