import React, { useState, useEffect } from 'react';
import Header from './Header/Header.js';
import UserList from './UserList/UserList.js';
import { getUsers } from '../../apiCallFunctions.js';

const HomePage = ({username, signOut}) => {
    const styles = {
        layout: {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gridGap: '20px',
            padding: '20px',
        },
        content: {
            border: '1px solid black',
            borderRadius: '10px',
            padding: '6px',
            backgroundColor: '#fff',
            minHeight: '800px'
        },
        overlay: { // need this to make the div FULL screen!!
            backgroundColor: '#f7f1e3',
            position: 'fixed',
            width: '100%',
            height: '100%',
        }
    }

    const [users, setUsers] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUsersFromDatabase();
    }, [])

    async function getUsersFromDatabase() {
        const resp = await getUsers();
        if (resp.success) {
            const userListFromAPI = resp.users.map(user => user.username)
            setUsers(userListFromAPI);
            setUserList(userListFromAPI);
        }
        console.log(resp);
    }


    function handleUserSearch() {

    }

    function handleProfileClick(username) {

    }

    function handleUserChat() {

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
                        handleProfileClick={handleProfileClick}
                        handleChatClick={handleUserChat}
                    />
                </div>

                <div style={styles.content}>
                    create new post and existing posts go here
                </div>

                <div style={styles.content}>
                    chat box goes here
                </div>
            </div>
        </div>
    )
}

export default HomePage;