import React from 'react';
import Header from './Header/Header.js';

const HomePage = ({username, signOut}) => {
    return (
        <div>
            <Header 
                username={username}
                signOut = {signOut}
            />
            User authenticated, welcome to the home page {username}!!!
        </div>
    )
}

export default HomePage;