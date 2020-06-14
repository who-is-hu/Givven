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
            type : DataTypes.STRING(100),
            defaultValue : "/uploads/default.jpg",
            allowNull : true,
        },
        dest_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        current_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        used_money : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        due_day : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        owner : {
            type : DataTypes.STRING(100),
            allowNull : false,
        }
        //auto create
        // userId
    },{
        timestamps : true,
        paranoid : true,
    });
};