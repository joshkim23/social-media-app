import React from 'react';
import Header from './Header/Header.js';

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
            height: '500px'
        },
        overlay: { // need this to make the div FULL screen!!
            backgroundColor: '#f7f1e3',
            position: 'fixed',
            width: '100%',
            height: '100%',
        }
    }
    return (
        <div style={styles.overlay}>
            <Header 
                username={username}
                signOut = {signOut}
            />

            <div style={styles.layout}>
                <div style={styles.content}>
                    Users List goes here
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