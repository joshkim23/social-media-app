import React from 'react';
import TextField from '@material-ui/core/TextField';
import UserListItem from './UserListItem.js';

const UserList = ({userList, handleSearchForUser, handleProfileClick, handleChatClick}) => {
    const styles = {
        mainContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            justifyContent: 'center'
        },
        userContainer: {
            margin: '5px 0px 5px'
        }
    }

    return (
        <div style={styles.mainContainer}>
            <TextField  
                label="Search Users"
                variant="outlined"
            />

                {userList && userList.map((user, index) => {
                    return (
                        <div style={styles.userContainer} key={index}>
                            <UserListItem 
                                key = {index}
                                username = {user}
                                handleUserProfileClick = {handleProfileClick}
                                handleUserChatClick = {handleChatClick}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export default UserList;