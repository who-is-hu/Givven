pragma solidity > 0.4.17;

contract Givven{

    address[] public Donate_Campaigns;
    address[] public Shops;

    function createCampaign() public {
        DonateCampaign newCampaign = new DonateCampaign(msg.sender);
        newCampaign.getAddress();
        Donate_Campaigns.push(newCampaign);
    }
}

contract DonateCampaign{

    address public social_org;
    //constructor
    constructor(address _social_org) public {
        social_org = _social_org;
    }
}
contract Shop{

}