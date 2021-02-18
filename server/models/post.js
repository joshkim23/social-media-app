import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    date: {type: String},
    likes: {type: Number},
    message: {type: String},
    postedBy: {type: String}
})

const Post = mongoose.model('posts', postSchema);
export default Post;