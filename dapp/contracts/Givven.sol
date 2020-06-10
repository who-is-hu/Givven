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
    struct Store{
        string owner;
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
    function addUser(string memory _user) public{
        accounts[_user] = 0;
    }
    function getBalance(string memory _user) public view returns (uint){

        return accounts[_user];
    }
    function chargeUser(string memory _user, uint _point) public onlyGivven {
        accounts[_user] += _point;
    }
    function dischargeUser(string memory _user, uint _point) public onlyGivven{
        require(accounts[_user] > _point);
        accounts[_user] -= _point;
    }

    //----------Campaign Method--------------
    function createCampaign(string memory _campaignId, string memory _socialorg) public {
        Campaign  memory newcampaign = Campaign(_socialorg,0,new string[](0));
        campaigns[_campaignId] = newcampaign;
    }
    function donate(string memory _user, string memory _campaignId, uint _value) public {
        require(accounts[_user] > _value);
        accounts[_user] -= _value;
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
    function getDonateValueByUser(string memory _campaignId,string memory _user) public view returns (uint ){
        return campaigns[_campaignId].donatevalue[_user];
    }

    //Store method
    function createStore(string memory _store,string memory _user) public {
        addUser(_user);
        Store memory newstore = Store(_user);
        stores[_store] = newstore;
    }
}