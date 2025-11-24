const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/cart-app`);

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String
})

module.exports = mongoose.model('user' , userSchema);