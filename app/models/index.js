const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.customers = require("./customer.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.turbo_catalog = require("./turbo_catalog.model")(mongoose);
db.turbo_list = require("./turbo_list.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);

module.exports = db;