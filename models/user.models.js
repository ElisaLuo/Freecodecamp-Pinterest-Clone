const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    source: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;