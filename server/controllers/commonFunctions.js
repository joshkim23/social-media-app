import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import {v4 as uuidv4} from 'uuid';

// returns the username associated with the user id
export const getUsernameById = async (id) => {
    let userDoc;
    userDoc = await User.findById(id, (err, doc) => { //need to await for the User.findById since it's an asynchronous function, need to wait for the promise.
        if(err) return err;
    })
    const user = JSON.parse(JSON.stringify(userDoc));
    console.log(`found username for the user with id: ${id}: ${user.username}`);
    return user.username;
}