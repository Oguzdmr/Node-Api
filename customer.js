var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    username: String,
    name: String,
    class: String,
    age: Number,
    city: String
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer

