import * as express from 'express';
import {createNewUser,
        getUser,
        createNewPost,
        lookUpPost,
        createNewComment,
        getAllPosts } from '../controllers/mongoDBStore.js';

const router = express.Router();

router.post('/createUser', createNewUser);

router.get('/:id', getUser);

router.post('/createPost/:id', createNewPost);

router.get('/post/:postID', lookUpPost);

router.get('/posts/all', getAllPosts)

router.post('/post/:id', createNewComment);

export default router;

