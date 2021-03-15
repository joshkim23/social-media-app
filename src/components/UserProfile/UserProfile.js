import React, { useEffect } from 'react';

import Post from '../Post.js';

import Header from '../Homepage/Header/Header.js';
import Box from '@material-ui/core/Box'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import indigo from '@material-ui/core/colors/indigo';
import { Typography } from '@material-ui/core';


const UserProfile = ({loggedInUsername, loggedInUserID, signOut, _id, firstName, lastName, city, username, posts, handleNavigateToUser}) => {
    const userPosts = posts;
    const styles = {
        overlay: {
            backgroundColor: `${indigo["50"]}`,
            position: 'fixed',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
        },
        layout: {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gridGap: '20px',
            padding: '20px',
        },
        userDataColumn: {
            display: 'grid',
            gridTemplateRows: '1fr 2fr',
            gridGap: '10px'
        },
        profileCard: {
            display: 'grid',
            gridGap: '10px',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '15px 15px 10px 15px',
        },
        postColumn: {
            display: 'grid',
            gridGap: '20px',
            borderRadius: '10px',
            backgroundColor: `${indigo["50"]}`,
            height: '890px',
            overflow: 'auto'
        },
        postsContainer: {
            borderRadius: '10px',
            backgroundColor: `${indigo["50"]}`,
            display: 'grid',
            gridTemplateColumns: '1fr',
            padding: '15px'
        },
        post: {
            marginBottom: '20px'
        },
        stats: {
            display: 'grid',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            height: '300px'
        },
        content: {
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            height: '800px',
            // height: '100%%',
            overflow: 'auto'
        }
    }

    // local storage on profile as well
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem('')
    // })

    const handleUsernameClicked = (id) => handleNavigateToUser(id);

    return (
        <div style={styles.overlay}>
            <Header 
                username={loggedInUsername}
                loggedInUserID={loggedInUserID}
                signOut = {signOut}
                navigateToUserProfile = {handleUsernameClicked}
            />
            <div style={styles.layout}> 
                <div style={styles.userDataColumn}>
                    <Box style={styles.profileCard} boxShadow={2}>
                       
                        <Typography variant="h5" style={{display: 'grid', justifySelf: 'center'}}>
                        <AccountCircle fontSize='large' style={{justifySelf: 'center'}}/>
                            {username}
                        </Typography>

                        <br/><br/>

                        <Button color="primary" variant="contained" style={{width: '150px', textTransform: 'none'}}>
                            Edit Info
                        </Button>
                        
                        <Button color="primary" variant="outlined" style={{textTransform: 'none'}}>
                            Chat
                        </Button>
                    </Box>

                    <Box style={styles.stats}>
                        <div>
                            Name: {firstName} {lastName}
                        </div>
                        <div>
                            city: {city}
                        </div>
                        <div>
                            posts: {posts.length}
                        </div>
                        <div>
                            systemID: {_id}
                        </div>
                    </Box>
                </div>

                <div style={styles.postColumn}>
                    <div style={styles.postsContainer}>
                        {posts.length >= 1 ? posts.map((post, index) => {
                            return (
                                <div style={styles.post} key={index}>
                                    <Post 
                                        key={index}
                                        username={username}
                                        message={post.message}
                                        likes={post.likes}
                                        comments={post.comments}
                                        date={post.createdAt} 
                                        handleNavigateToUser={handleUsernameClicked}
                                    />
                                </div>
                            )
                        }) : <Box style={styles.profileCard} boxShadow={2}>
                                <Typography variant="h6">
                                    Such Empty    
                                </Typography>
                            </Box>}

                    </div>
                </div>

                <Box style={styles.content} boxShadow={2}>
                    Chat box goes here
                </Box>
            </div>


        </div>
    )
}

export default UserProfile;