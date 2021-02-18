import express from 'express';
import User from '../models/user.js';
import  {v4 as uuidv4} from 'uuid';

const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { firstName, lastName, city, username, password, posts } = req.body;
    const userID = `user-${uuidv4()}`
    const newUser = new User({userID, firstName, lastName, city, username, password, posts});

    if(!username || !password) res.send({message: 'failed to save user to database'})

    // search the user database for a matching username. If the number of docs returned that match = 0, try saving the user to the database. if it exists, send back that the user already exists.
    User.find({username: username}, async (err, doc) => {
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
                message: 'username already taken, try again'
            })
        }
    })




});

// router.get('/all', async (req, res) => {
    
// })

export default router;

