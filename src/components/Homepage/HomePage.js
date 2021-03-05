import React, { useState, useEffect } from 'react';
import Header from './Header/Header.js';
import UserList from './UserList/UserList.js';
import Post from '../Post.js';
import NewPost from './NewPost.js';
import { getUsers, getPosts, submitPost } from '../../apiCallFunctions.js';
import { Typography } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import Box from '@material-ui/core/Box'

const HomePage = ({username, loggedInUserID, firstName, signOut, navigateToUserProfile}) => {
    const styles = {
        overlay: { // need this to make the div FULL screen!!
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
        content: {
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            height: '800px',
            // height: '100%%',
            overflow: 'auto'
        },
        postColumn: {
            display: 'grid',
            gridGap: '20px',
            borderRadius: '10px',
            backgroundColor: `${indigo["50"]}`,
            height: '890px',
            // height: '100%%',

            overflow: 'auto'
        },
        newPost: {
            backgroundColor: '#fff',
            padding: '15px'
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
        chatBoxContainer: {

        }
    }

    const [users, setUsers] = useState([]); // stores all users grabbed from the database - includes general information 
    const [userList, setUserList] = useState([]); //stores the list of usernames sent to the usersList component - changes upon search input
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUsersFromDatabase();
        getAllPostsFromDatabase();
    }, [])

    async function getUsersFromDatabase() {
        const resp = await getUsers();
        if (resp.success) {
            const usersWithoutLoggedInUser = resp.users.filter(user => user.username !== username);
            setUsers(usersWithoutLoggedInUser);

            const usernameList = usersWithoutLoggedInUser.map(user => user.username)
            setUserList(usernameList);
        }
        console.log(resp);
    }

    async function getAllPostsFromDatabase() {
        const resp = await getPosts();
        if (resp.success) {
            const allPostsFromDatabase = resp.posts;
            setPosts(allPostsFromDatabase);
        }
        console.log(resp);
    }

    function handleUserSearch(input) {
        if(input === '') {
            setUserList(users.map(user => user.username));
        } else {
            const filteredUsers = users.filter(user => user.username.toLowerCase().slice(0, input.length) === input).map(user => user.username); //after you filter the results, it returns the whole array index for the user which includes everything from the api, not just the usernames. need to map the results to grab the usernames
            console.log(filteredUsers);
            setUserList(filteredUsers);
        }
    }

    function handleUserChat() {

    }

    async function handleSubmitNewPost(input) {
        try {
            const resp = await submitPost(input, loggedInUserID)
            if(resp.success) {
                getAllPostsFromDatabase();
            } 
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUsernameClicked = (selectedUsername) => {
        if(selectedUsername === username) {
            navigateToUserProfile(loggedInUserID)
        } else {
            const clickedUser = users.find(user => user.username === selectedUsername);
            const clickedUserID = clickedUser._id;
            navigateToUserProfile(clickedUserID);
        }
    }


    return (
        <div style={styles.overlay}>
            <Header 
                username={username}
                signOut = {signOut}
                handleUserProfileClick={handleUsernameClicked}
            />

            <div style={styles.layout}>
                <Box style={styles.content} boxShadow={2}>
                    <UserList 
                        userList={userList}
                        handleSearchForUser={handleUserSearch}
                        handleChatClick={handleUserChat}
                        handleUserProfileClick={handleUsernameClicked}
                    />
                </Box>

                <div style={styles.postColumn}>
                    <NewPost 
                        username={username}
                        firstName={firstName}
                        handleSubmitPost={handleSubmitNewPost}
                    />

                    <div style={styles.postsContainer}>

                        {posts.map((post, index) => {
                            return (
                                <div style={styles.post} key={index}>
                                    <Post 
                                        key={index}
                                        username={post.postedBy}
                                        message={post.message}
                                        likes={post.likes}
                                        comments={post.comments}
                                        date={post.createdAt} 
                                        handleNavigateToUser={handleUsernameClicked}
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>

                <Box style={styles.content} boxShadow={2}>
                    chat box goes here
                </Box>
            </div>
        </div>
    )
}

export default HomePage;