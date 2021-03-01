import * as express from 'express';
import {authenticateAndGetUser,
        createNewUser,
        getUser,
        createNewPost,
        lookUpPost,
        createNewComment,
        getAllPosts,
        getAllUsers } from '../controllers/mongoDBStore.js';

const router = express.Router();

router.post('/authenticate', authenticateAndGetUser);

router.post('/createUser', createNewUser);

router.get('/lookupUser/:id', getUser);

router.post('/createPost/:id', createNewPost);

router.get('/post/:postID', lookUpPost);

router.get('/posts/all', getAllPosts)

router.get('/all', getAllUsers)

router.post('/post/:id', createNewComment);

export default router;

