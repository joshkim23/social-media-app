import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    postedByID: {type: String},
    message: {type: String},
    likes: {type: Number},
    comments: {type: [String]}
}, {
    timestamps: true
})

const Post = mongoose.model('posts', postSchema);
export default Post;