import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import {v4 as uuidv4} from 'uuid';
import { getUsernameById} from './commonFunctions.js';

export const authenticateAndGetUser = (req, res) => {
    const { username, password } = req.body;
    User.find({username: username}, (err, userDoc) => {
        if(err) {
            res.send({error: err});
        } else if(userDoc.length === 0) {
            res.send({error: 'username doesnt exist in database. create a user?'});
        } else if(userDoc.length === 1) {
            const user = JSON.parse(JSON.stringify(userDoc[0]));
            if(user.password === password) {
                res.send({
                    success: true,
                    message: "user authenticated. redirecting to homepage...",
                    userData: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        city: user.city,
                        username: user.username,
                        posts: user.posts
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: "password is incorrect. try again"
                })
            }
        }

    })
}


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

// grabs selective user profile data and all the posts that the user created - route for getting a user's profile page
export const getUser = async (req, res) => {
    const userID = req.params.id;
    User.findById(userID, (err, doc) => {
        if(err) {
            res.send({
                message: 'user does not exist'
            })
        } else {
            const userDocument = JSON.parse(JSON.stringify(doc));

            let userProfileData = {
                _id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                city: userDocument.city,
                username: userDocument.username,
                posts: null
            }

            Post.find({postedByID: userID}, (err, docs) => {
                if(err) res.send(err);

                if(docs.length !== 0) {
                    const posts = JSON.parse(JSON.stringify(docs));
                    const postsByUser = posts.map(doc => {
                        return {
                            _id: doc._id,
                            postedByID: doc.postedByID,
                            message: doc.postedByID,
                            likes: doc.likes,
                            comments: doc.comments.length
                        }
                    }) 

                    userProfileData.posts = postsByUser;
                } else {
                    userProfileData.posts = [];
                }
                res.send({
                    success: true,
                    message: "successfully fetched user profile",
                    userData: userProfileData
                })
            })
        }
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

// grabs the post and all the comments. The comment document ids in the comments array of the post document are only added to know how many comments there are (size of the array), not to look up each comment id by id thats too slow. instead, grab the post id and search the comments database for the postID!! only need to search through the database ONCE for one id, instead of n number of times where n is the number of comments!!!! data structure!
export const lookUpPost = async (req, res) => {
    const postID = req.params.postID;

    try {
        Post.findById(postID, (err, doc) => {
            if(err) {
                res.send({
                    success: false,
                    message: 'couldnt fetch the post - was it deleted?',
                    error: err
                })
            } else {
                const post = JSON.parse(JSON.stringify(doc));
                let postWithComments = {
                    postedByID: post.postedByID,
                    message: post.message,
                    likes: post.likes,
                    comments: null
                }

                // grabs all the comments on the post, looks up the usernames associated with each comma, since you're searching through the db with each iteration of the .map of the comments array, you need to add async await and all promise.all to wait to store comments until all the promises have been returned otherwise you will get an empty object for comments!!!!
                Comment.find({postID: postID}, async (err, docs) => {
                    if(err) {
                        res.send(err);
                    } 

                    if(docs.length !== 0) {
                        const commentDocuments = JSON.parse(JSON.stringify(docs));
                        const comments = await Promise.all(commentDocuments.map(async doc => {
                            
                            const username = await getUsernameById(doc.postedByID)
                            
                            return {
                                postedByID: doc.postedByID,
                                postedByName: username,
                                postID: doc.postID,
                                message: doc.message,
                                likes: doc.likes
                            }
                        }))

                        postWithComments.comments = comments;
                    } else {
                        postWithComments.comments = [];
                    }

                    res.send({
                        success: true,
                        message: 'post with all comments fetched successfully!',
                        post: postWithComments
                    })

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
    Post.find({}, async (err, docs) => {
        if(err) {
            res.send({
                success: false,
                error: err
            }) 
        } else {
            let posts = JSON.parse(JSON.stringify(docs));
            const translatedPosts = await Promise.all(posts.map(async (doc) => {

                const username = await getUsernameById(doc.postedByID)
                return {
                    _id: doc._id,
                    likes: doc.likes,
                    message: doc.message,
                    postedByID: doc.postedByID,
                    postedBy: username,
                    createdAt: doc.createdAt,
                    comments: doc.comments.length
                }
            }))
            res.send({
                success: true,
                message: 'successfully fetched all posts!',
                posts: translatedPosts
            });
        }
    })
}