import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postedByID: {type: String},
    message: {type: String},
    likes: {type: Number}
}, {
    timestamps: true
})

const Comment = mongoose.model('comments', commentSchema);
export default Comment;