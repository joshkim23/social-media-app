import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const Post = ({ username, message, likes, comments, date }) => {
    const styles = {
        mainContainer: {
            display: 'grid',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '2px 5px 2px 5px',
        },
        message: {
            display: 'grid',
        },
        likesAndComments: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
        }
    }

    return (
        <div style={styles.mainContainer}>
            <div>
                {username}  {date}
            </div>

            <div style={styles.message}>
                {message}
            </div>

            <div style={styles.likesAndComments}>
                likes: {likes} <br />
                comments: {comments}
            </div>
        </div>
    )
}

export default Post;