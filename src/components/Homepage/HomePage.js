import React from 'react';
import Header from './Header/Header.js';

const HomePage = ({username}) => {
    return (
        <div>
            <Header />
            User authenticated, welcome to the home page {username}!!!
        </div>
    )
}

export default HomePage;