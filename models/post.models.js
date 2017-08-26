const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    username: String,
    userId: String,
    image: String,
    comment: String,
    likedUsers: [{type: String, default: ""}]
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;