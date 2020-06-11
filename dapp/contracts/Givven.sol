pragma solidity > 0.4.17;

contract Givven{

    address admin;

    
    mapping(string => uint) accounts;
    mapping(string => Campaign) campaigns;
    mapping(string => Store) stores;

    struct Campaign{
        string socialOrg;
        uint currentDonate;
        string[] donator;
        mapping(string => uint) donatevalue;
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
        accounts[_user] -= _point;
    }

    //----------Campaign Method--------------
    function createCampaign(string memory _campaignId, string memory _socialOrg) public {
        Campaign  memory newcampaign = Campaign(_socialorg,0,new string[](0));
        campaigns[_campaignId] = newcampaign;
    }

    function donate(string memory _userEmail, string memory _campaignId, uint _value) public {
        require(accounts[_userEmail] > _value);
        accounts[_userEmail] -= _value;
        Campaign storage target = campaigns[_campaignId];
        target.currentDonate += _value;
        target.donatevalue[_user] = _value;
        target.donator.push(_user);
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

    function purchase(string memory _socialOrg, string memory _seller, string memory _product, uint value) public {
        require 
    }
    function getRestPoint(string memory _socialOrg, string memory _campaignId){
        account[_socialOrg] += campaigns[_campaignId].currentDonate;
        campaigns[_campaignId].currentDonate = 0;
    }
}