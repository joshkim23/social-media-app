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
            borderRadius: '10px',
            padding: '15px',
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

    const [users, setUsers] = useState([]); // stores all users grabbed from the database - includes general information 
    const [userList, setUserList] = useState([]); //stores the list of usernames sent to the usersList component - changes upon search input

    useEffect(() => {
        getUsersFromDatabase();
    }, [])

    async function getUsersFromDatabase() {
        const resp = await getUsers();
        if (resp.success) {
            setUsers(resp.users);

            const userListFromAPI = resp.users.map(user => user.username)
            setUserList(userListFromAPI);
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