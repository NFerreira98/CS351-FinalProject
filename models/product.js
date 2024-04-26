var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    productId: {type: String, required: true},
    productName: {type: String, required: true},
    productPrice: {type: Number, required: true},
});

module.exports = mongoose.model('Product', schema);