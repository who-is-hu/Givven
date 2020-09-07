const { Op } = require('sequelize');

const ItemService = class {
  constructor(itemModel, userModel) {
    this.itemModel = itemModel;
    this.userModel = userModel;
  }
  async register(user, item) {
    let { name, price, content, stock, title_img } = item;
    let result = {};
    if (item.title_img == null) title_img = '/uploads/default.jpg';

    const exItem = await this.itemModel.create({
      name,
      content,
      stock,
      owner: user.name,
      price,
      title_img,
      userId: user.id,
    });
    if (exItem) {
      return true;
    }
    return false;
  }
  async getItemList() {
    const items = await this.itemModel.findAll();
    return items;
  }
  async getItem(itemId) {
    const item = await this.itemModel.findOne({ where: { id: itemId } });
    return item;
  }
  async getMyItems(user) {
    const items = await user.getItems();
    return items;
  }
};

module.exports = ItemService;
