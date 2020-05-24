module.exports = (sequelize, DataTypes) => {
    return sequelize.define('campaign',{
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
        dest_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        current_money : {
            type : DataTypes.INTEGER,
            defaultValue : 0,
            allowNull : true,
        },
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        due_day : {
            type : DataTypes.DATE,
            allowNull : false,
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};