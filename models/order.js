module.exports = (sequelize, DataTypes) => {
    return sequelize.define('order',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        addr : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },
        from: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        to: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        itemId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        orderCount : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        transactionId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        } 
        //auto create
        // campaignId
    },{
        timestamps : true,
        paranoid : true,
    });
};