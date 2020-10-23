const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database.local.uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open",function(){
    console.log("\n\nMongoose connection successfull\n\n");
});

module.exports = connection;
