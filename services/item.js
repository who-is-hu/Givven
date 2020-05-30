const { Op } = require('sequelize');

const ItemService = class {
    constructor(itemModel, userModel){
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
    async register(user, item){
        let { name , price, content, stock, title_img } = item;
        if(item.title_img == null)
            title_img = "/uploads/default.jpg"
        try{
            const exItem = await this.itemModel.create({
                name,
                content,
                stock,
                owner : user.name,
                price,
                title_img,
                userId : user.id,
            });
            let result ={};
            if(!exItem){
               result = { result : false, msg : 'creation failed'};
            } else {
                result = { result : true, msg : "success"};
            }
            return result;
        }catch(err){
            console.error(err);
        }
    }
    async getItemList(){
        try{
            const items = await this.itemModel.findAll();
            return items;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getItem(itemId){
        try{
            const item = await this.itemModel.findOne({where : { id : itemId}});
            return item;
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = ItemService;
