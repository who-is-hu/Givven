module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        },
        title_img : {
            type : DataTypes.STRING(50),
            defaultValue : "/uploads/default.jpg",
            allowNull : true,
        },
        content : {
            type : DataTypes.STRING(500),
            allowNull : true,
        },
        price : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        stock : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner : {
            type: DataTypes.STRING(100),
            allowNull : false,
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};