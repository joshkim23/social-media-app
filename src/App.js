import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import SignIn from './components/SignIn/SignIn.js';
import HomePage from './components/Homepage/HomePage.js';
import CreateAccountForm from './components/CreateAccountForm.js';

const App = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [loggedInUserID, setLoggedInUserID] = useState('');

    const setLoggedInUserData = (userData) => {
        console.log(userData);
        setUsername(userData.username);
        setFirstName(userData.firstName);
        setLoggedInUserID(userData._id);
        
        if(!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(userData));
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        console.log(JSON.parse(loggedInUser));
        if (loggedInUser) { 
            setUser(JSON.parse(loggedInUser));
            setUsername(JSON.parse(loggedInUser).username);
            setFirstName(JSON.parse(loggedInUser).firstName);
            setLoggedInUserID(JSON.parse(loggedInUser)._id)
            // setUserLookUp(JSON.parse(loggedInUser));
        } 
    },[]);

    const handleSignOut = () => {
        localStorage.clear();
        setUsername('');
        setFirstName('');
    }

    return (
        <Router>
            <Route path = "/" exact 
                render = {() => <SignIn handleUserLogin={setLoggedInUserData}/>}/>

            <Route path = "/home" 
                render = {() => <HomePage 
                                    username={username}
                                    loggedInUserID={loggedInUserID}
                                    firstName={firstName}
                                    signOut={handleSignOut}
                                />
                }/>

            <Route path = '/createAccount' exact
                render = {() => <CreateAccountForm handleUserCreated={setLoggedInUserData}/>}/>

            {/* {!username && <Redirect to='/' />} */}

                
            
            
        </Router>
    )
}

export default App;