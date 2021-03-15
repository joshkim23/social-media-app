import React from 'react';
import {Link} from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import indigo from '@material-ui/core/colors/indigo'

const UserListItem = ({username, _id, handleUserChatClick, handleProfileClick}) => {
    const styles = {
        container: {
            height: '50px',
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
    // const navigateToProfile = () => handleProfileClick(_id); 

    return (
        <div style={styles.container}>
            <div style={styles.profilePicAndUsername}>
                <AccountCircle style={{color: `${indigo["200"]}`}}/>

                <Button
                    component={Link}
                    to={`/profile/${username}`}
                    style={{justifyContent: 'start', textTransform: 'none'}}
                    onClick={() => handleProfileClick(_id)}
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