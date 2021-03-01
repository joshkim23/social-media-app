import React from 'react';
import TextField from '@material-ui/core/TextField';
import UserListItem from './UserListItem.js';
import Box from '@material-ui/core/Box'

const UserList = ({userList, handleSearchForUser, handleChatClick}) => {

    const styles = {
        mainContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            justifyContent: 'center',
            overflow: 'auto'
        },
        userContainer: {
            margin: '2px 0px 2px'
        },
        usersList: {
            display: 'grid',
            overflow: 'auto'
        }
    }

    const searchInputChanged = (input) => handleSearchForUser(input);


    return (
        <div style={styles.mainContainer}>
            <TextField  
                label="Search Users"
                variant="outlined"
                onChange={event => searchInputChanged(event.target.value)}
            />
                {userList && userList.map((user, index) => {
                    return (
                        <div style={styles.userContainer} key={index}>
                            <UserListItem 
                                key = {index}
                                username = {user}
                                handleUserChatClick = {handleChatClick}
                            />
                        </div>
                    )
                })}
        </div>
    )
}
export default UserList;