import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import {v4 as uuidv4} from 'uuid';

// handles request to create new user. Checks to see if there are any existing users with the same username as was inputted, if there is a copy then it returns a success: false and prompts the user to choose a different username. Otherwise it creates the new user document and sends it back to the UI
export const createNewUser = async (req, res) => {
    const { firstName, lastName, city, username, password } = req.body;
    const userID = `user-${uuidv4()}`
    const posts = [];
    const newUser = new User({userID, firstName, lastName, city, username, password, posts});

    if(!username || !password) res.send({message: 'failed to save user to database'})

    User.find({username: username}, async (err, doc) => {    // search the user database for a matching username. If the number of docs returned that match = 0, try saving the user to the database. if it exists, send back that the user already exists.
        // const postedByUserDocument = JSON.parse(JSON.stringify(doc[0])); //NEED to do this json conversion in order to grab and edit the fields in the document!
        if(doc.length === 0) {
            try {
                console.log(`this is a novel username: ${username}`);
                const resp = await newUser.save();
                
                res.send({
                    success: true,
                    message: `new User profile created! Welcome ${username}`,
                    newUser: newUser
                })
                // res.status(201).json(newUser);
                console.log('User saved to database!!', resp);
            } catch (error) {
                res.send(error);
                // res.status(409).json({message:})
                console.log('something went wrong saving to the database... sorry', error);
            }
        } else {
            res.send({
                success: false,
                message: 'username already taken, try again',
            })
        }
    })
}

export const getUser = async (req, res) => {
    const userID = req.params.id;
    User.findById(userID, (err, doc) => {
        if(err) res.send({message: 'user doesnt exist'});
        else res.send({
            success: true,
            message: 'user fetched',
            userData: doc
        })
    })
}

// handles request to create new post. finds the user who posted it, updates the posts array with the new post ID once the post is saved, sends back the new post and the updated user document
export const createNewPost = async (req, res) => {
    const { likes, message } = req.body;
    const postedByID = req.params.id;
    console.log('the following user is attempting to make a post - userID: ', postedByID);

    const newPost = new Post({likes, message, postedByID});

    try {
        const postFromMongo = await newPost.save();
        User.findByIdAndUpdate(postedByID, {$push: {posts: postFromMongo._id}}, null, (err, doc) => { //need to make options null in order for the callback function to work.
            if(err) {
                res.send({message: 'failed to update user with post'})
            } else {
                res.send({
                    success: true,
                    message: `new post created by ${postedByID} has been posted!`,
                    post: postFromMongo
                })
            }
        });
        

    } catch (error) {
        res.send(error);
        console.log('something went wrong - couldnt save post to database');
    }
}

export const createNewComment = async (req, res) => {
    const postID = req.params.id;
    const { postedByID, message, likes } = req.body;

    const newComment = new Comment({postedByID, postID, message, likes});
    try {
        const newCommentFromMongo = await newComment.save();
        Post.findByIdAndUpdate(postID, {$push: {comments: newCommentFromMongo._id}}, null, (err, doc) => {
            if(err) {
                res.send({message: 'failed to post comment - maybe the post was deleted'})
            } else {
                res.send({
                    success: true,
                    message: `comment on post id ${postID} was posted successfully!`,
                    post: doc //sends old post...
                })
            }
        })

    } catch (error) {
        res.send(error);
    }
}

export const lookUpPost = async (req, res) => {
    const postID = req.params.postID;

    try {
        Post.findById(postID, (err, doc) => {
            if(err) res.send({message: 'couldnt fetch the post - was it deleted?'});
            else {
                res.send({
                    success: true,
                    message: 'post document fetched.',
                    post: doc
                })
            }
        })
    } catch (error) {
        res.send({
            success: false,
            message: 'failed to connect to database'
        })
    }
}

export const getAllPosts = async (req, res) => {
    Post.find({}, (err, docs) => {
        if(err) {
            res.send({
                success: false,
                error: err
            }) 
        } else {
            let posts = JSON.parse(JSON.stringify(docs));
            const translatedPosts = posts.map((doc) => {
                return {
                    _id: doc._id,
                    likes: doc.likes,
                    message: doc.message,
                    postedByID: doc.postedByID,
                    createdAt: doc.createdAt,
                    comments: doc.comments.length
                }
            })
            res.send(translatedPosts);
        }
    })
}