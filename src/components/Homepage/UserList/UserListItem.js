import React from 'react';

const UserListItem = ({username, handleUserProfileClick, handleUserChatClick}) => {
    return (
        <div>
            {username}
        </div>
    )
}

export default UserListItem;