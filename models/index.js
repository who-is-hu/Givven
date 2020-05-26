const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Campaign = require('./campaign')(sequelize, Sequelize);
db.Item = require('./item')(sequelize,Sequelize);
db.Order = require('./order')(sequelize,Sequelize);
db.Donation = require('./donation')(sequelize,Sequelize);

/* user and campign */
db.User.hasMany(db.Campaign);
db.User.hasMany(db.Donation);

/* item */
db.User.hasMany(db.Item);

db.Campaign.hasMany(db.Order);
db.Campaign.hasMany(db.Donation);

module.exports = db;