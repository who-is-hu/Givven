const services = {};

services.Campaign = require('./campaign');
services.Item = require('./item');
services.Trade = require('./trade');
services.Order = require('./order');
module.exports = services;