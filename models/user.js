module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        email: {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        },
        nick : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        password : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        //studyId in Enroll
        //tagId in EnrollTag
    },{
        timestamps : true,
        paranoid : true,
    });
};