const mongoose = require('mongoose');

const cardDetailSchema = mongoose.Schema({
    creditCardNumber: String,
    cardHolder: String,
    expirationDate: Date,
    securityCode: String,
    amount:Number
});

module.exports = mongoose.model('cardetails', cardDetailSchema);