import React from 'react';
import {Link} from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const UserListItem = ({username, handleUserProfileClick, handleUserChatClick}) => {
    const styles = {
        container: {
            height: '50px',
            border: '1px solid black',
            borderRadius: '5px',
            display: 'grid',
            alignItems: 'center',
            padding: '2px 5px 2px 5px',
            gridTemplateColumns: '3fr 1fr',
            gridGap: '10px'
        },
        profilePicAndUsername: {
            display: 'flex',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center'
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.profilePicAndUsername}>
                <AccountCircle />

                <Button
                    component={Link}
                    to={`/${username}`}
                    style={{justifyContent: 'start', textTransform: 'none'}}
                >
                    {username}
                </Button>
            </div>

            <Button variant='outlined' color="primary">
                Chat
            </Button>

        </div>
    )
}

export default UserListItem;