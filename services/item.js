const { Op } = require('sequelize');

const ItemService = class {
    constructor(itemModel, userModel){
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
    async register(user, item){
        let { name , price, content, stock, title_img } = item;
        let result ={};
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
            if(!exItem){
                result = { success : true, msg : "success"};
            }
            return result;   
        }catch(err){
            console.error(err);
            result = { success : false, msg : "failed"};
            return result;
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
