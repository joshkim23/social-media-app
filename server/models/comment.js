import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postedByID: {type: String},
    postID: {type: String},
    message: {type: String},
    likes: {type: [String]}
}, {
    timestamps: true
})

const Comment = mongoose.model('comments', commentSchema);
export default Comment;