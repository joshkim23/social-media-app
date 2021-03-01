import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { formatDateTime } from '../utility/dateTimeFormatter.js';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircle from '@material-ui/icons/AccountCircle';



const Post = ({ username, message, likes, comments, date }) => {
    const styles = {
        mainContainer: {
            display: 'grid',
            borderRadius: '15px',
            padding: '15px',
            backgroundColor: '#fff'
        },
        usernameAndDate: {
            display: 'grid',
            gridTemplateColumns:'1fr 1fr',
            alignItems: 'center'
        },
        message: {
            display: 'grid',
            padding: '7px 0 7px 0'
        },
        likesAndComments: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
        },
        buttons: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            paddingTop: '5px',
            gridGap: '5px'
        }
    }

    return (
        <Box style={styles.mainContainer} boxShadow={2}>
            <div style={styles.usernameAndDate}>
                <Typography style={{color: `${grey["600"]}`, display: 'flex', fontSize: '14px', alignItems: 'center'}}>
                    <AccountCircle style={{paddingRight: '5px', color: 'primary'}} />
                    <div>
                        {username}
                    </div>
                </Typography>
                <Typography style={{justifySelf: 'end', fontSize: '11px'}}>
                    {formatDateTime(date)}
                </Typography>
            </div>

            <Typography variant="h6" style={styles.message}>
                {message}
            </Typography>

            <div style={styles.likesAndComments}>
                <Typography style={{fontSize: '12px'}}>
                    {likes} likes
                </Typography>
                <Typography style={{fontSize: '12px', justifySelf: 'end'}}>
                    {comments} {comments !== 1 ? 'comments': 'comment'}
                </Typography>
            </div>

            <div style={styles.buttons}>
                <Button variant="outlined" color="primary" style={{textTransform: 'none'}}>
                    <ThumbUpAltIcon  style={{paddingRight: '5px', fontSize: '15px'}}/>
                    Like
                </Button>

                <Button variant="outlined" color="primary" style={{textTransform: 'none'}}>
                    <CommentIcon style={{paddingRight: '5px', fontSize: '15px'}} />
                    Comment
                </Button>
            </div>
        </Box>
    )
}

export default Post;