const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    username: String,
    image: String,
    comment: String,
    likes: {type: Number, default: 0}
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;