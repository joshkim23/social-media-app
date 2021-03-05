import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import SignIn from './components/SignIn/SignIn.js';
import HomePage from './components/Homepage/HomePage.js';
import CreateAccountForm from './components/CreateAccountForm.js';
import UserProfile from './components/UserProfile/UserProfile.js';

import { getUser } from './apiCallFunctions.js';

const App = () => {
    const [username, setUsername] = useState('');
    // const [user, setUser] = useState({
    //     _id: '',
    //     firstName: '',
    //     lastName: '',
    //     city: '',
    //     username: '',
    //     posts: []
    // });
    const [firstName, setFirstName] = useState('');
    const [loggedInUserID, setLoggedInUserID] = useState('');
    const [userLookUp, setUserLookUp] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        city: '',
        username: '',
        posts: []
    });

    const setLoggedInUserData = (userData) => {
        console.log('signed in successfully! user data: ',userData);
        // setUser(userData);
        setUsername(userData.username);
        setFirstName(userData.firstName);
        setLoggedInUserID(userData._id);
        
        if(!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(userData));
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        console.log('user grabbed from local storage: ',JSON.parse(loggedInUser));
        if (loggedInUser) { 
            // setUser(JSON.parse(loggedInUser));
            setUsername(JSON.parse(loggedInUser).username);
            setFirstName(JSON.parse(loggedInUser).firstName);
            setLoggedInUserID(JSON.parse(loggedInUser)._id)
            setUserLookUp(JSON.parse(loggedInUser));
        } 
    },[]);

    const handleSignOut = () => {
        localStorage.clear();
        setUsername('');
        setFirstName('');
    }

    async function handleGrabUserProfile(_id) {
        console.log('request to route to user with id', _id)
        // if(_id !== loggedInUserID) {
            const resp = await getUser(_id);
            if(resp.success) {
                console.log('setting user look up: ', resp.userData);
                setUserLookUp(resp.userData);
            }
        // } else {
        //     setUserLookUp(user);
        // }
    }

    return (
        <Router>
            <Route path = "/" exact 
                render = {() => <SignIn handleUserLogin={setLoggedInUserData}/>}
            />

            <Route path = "/home" 
                render = {() => <HomePage 
                                    username={username}
                                    loggedInUserID={loggedInUserID}
                                    firstName={firstName}
                                    signOut={handleSignOut}
                                    navigateToUserProfile={handleGrabUserProfile}
                                />
                        }
            />

            <Route path = '/createAccount' exact
                render = {() => <CreateAccountForm handleUserCreated={setLoggedInUserData}/>}/>

            {/* {!username && <Redirect to='/' />} */}

            <Route path = {'/profile/:username'}    
                render = {() => <UserProfile 
                                    loggedInUsername={username}
                                    signOut={handleSignOut}
                                    _id={userLookUp._id}
                                    firstName={userLookUp.firstName}
                                    lastName={userLookUp.lastName}
                                    city={userLookUp.city}
                                    username={userLookUp.username}
                                    posts={userLookUp.posts}
                                    handleNavigateToUser={handleGrabUserProfile}
                                />
                        } 
            />

                
            
            
        </Router>
    )
}

export default App;