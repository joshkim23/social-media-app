import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userID: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    city: {type: String},
    username: {type: String},
    password: {type: String},
    posts: {type: [String]}
}, {
    timestamps: true
})

const User = mongoose.model('user-profiles', userSchema);
export default User;