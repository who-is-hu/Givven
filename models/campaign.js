module.exports = (sequelize, DataTypes) => {
    return sequelize.define('campaign',{
        name: {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        },
        dest_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        current_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        due_day : {
            type : DataTypes.STRING(10),
            allowNull : false,
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};