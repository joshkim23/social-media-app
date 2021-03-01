import React from 'react';
import TextField from '@material-ui/core/TextField';
import UserListItem from './UserListItem.js';

const UserList = ({userList, handleSearchForUser, handleProfileClick, handleChatClick}) => {
    const styles = {
        mainContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            justifyContent: 'center'
        }
    }

    return (
        <div style={styles.mainContainer}>
            <TextField  
                label="Search Users"
                variant="outlined"
            />

            {userList && userList.map(user => {
                return (
                    <UserListItem 
                        username = {user}
                        handleUserProfileClick = {handleProfileClick}
                        handleUserChatClick = {handleChatClick}
                    />
                )
            })}
        </div>
    )
}

export default UserList;