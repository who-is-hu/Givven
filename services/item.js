const { Op } = require('sequelize');

const ItemService = class {
    constructor(itemModel, userModel){
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
};

module.exports = ItemService;
