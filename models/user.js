module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        email: {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        },
        name : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        password : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        type : {
            type : DataTypes.STRING(10),
            allowNull : false,
        },
        point : {
            type : DataTypes.INTEGER,
            allowNull : true, 
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};