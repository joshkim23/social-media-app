import * as express from 'express';
import {createNewUser,
        createNewPost } from '../controllers/mongoDBStore.js';

const router = express.Router();

router.post('/createUser', createNewUser);

router.post('/createPost/:id', createNewPost);

export default router;

