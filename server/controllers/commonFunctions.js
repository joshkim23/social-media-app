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

export const reverseArrayOrderBecauseMongooseIsTrash = (array) => {
    let left = null;
    let right = null;
    let length = array.length;

    for(left = 0, right = length-1; left < right; left +=1, right -= 1) {
        let temporary = array[left]; //stores the temporary far left value into the far right index
        array[left] = array[right]; //flip the location of the far left with far right
        array[right] = temporary; //increment the index, so you only need to go through half of the array. brilliant.
    }
    return array;
}