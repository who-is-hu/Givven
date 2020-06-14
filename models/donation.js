module.exports = (sequelize, DataTypes) => {
    return sequelize.define('donation',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        transactionId : {
            type : DataTypes.STRING(66),
            allowNull : false,
        }
        //auto create
        // userId : from
        // campaignId : to
    },{
        timestamps : true,
        paranoid : true,
    });
};