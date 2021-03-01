import React, { useState, useEffect } from 'react';
import Header from './Header/Header.js';
import UserList from './UserList/UserList.js';
import Post from '../Post.js';
import NewPost from './NewPost.js';
import { getUsers, getPosts } from '../../apiCallFunctions.js';
import { Typography } from '@material-ui/core';

const HomePage = ({username, signOut}) => {
    const styles = {
        overlay: { // need this to make the div FULL screen!!
            backgroundColor: '#f7f1e3',
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
            overflow: 'auto'
        },
        postColumn: {
            display: 'grid',
            gridGap: '20px',
            borderRadius: '10px',
            backgroundColor: '#f7f1e3',
            height: '890px',
            overflow: 'auto'
        },
        newPost: {
            backgroundColor: '#fff',
            padding: '15px'
        },
        postsContainer: {
            borderRadius: '10px',
            backgroundColor: '#fff',
            display: 'grid',
            gridTemplateColumns: '1fr',
            overflow: 'auto',
            padding: '15px'
        },
        post: {
            marginBottom: '10px'
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

    function handleSubmitNewPost(input) {
        console.log('request to submit new post: ', input);
    }


    return (
        <div style={styles.overlay}>
            <Header 
                username={username}
                signOut = {signOut}
            />

            <div style={styles.layout}>
                <div style={styles.content}>
                    <UserList 
                        userList={userList}
                        handleSearchForUser={handleUserSearch}
                        handleChatClick={handleUserChat}
                    />
                </div>

                <div style={styles.postColumn}>
                    <div style={styles.newPost}>
                        <NewPost 
                            username={username}
                            handleSubmitPost={handleSubmitNewPost}
                        />
                    </div>

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
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>

                <div style={styles.content}>
                    chat box goes here
                </div>
            </div>
        </div>
    )
}

export default HomePage;