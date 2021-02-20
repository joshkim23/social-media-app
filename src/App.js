import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import SignIn from './components/SignIn/SignIn.js';
import HomePage from './components/Homepage/HomePage.js';
import CreateAccountForm from './components/CreateAccountForm.js';

const App = () => {
    const [username, setUsername] = useState('');
    const setLoggedInUserData = (userData) => {
        console.log(userData);
        setUsername(userData.username);
    }
    useEffect(() => {},[username]);

    return (
        <Router>
            <Route path = "/" exact 
                render = {() => <SignIn handleUserLogin={setLoggedInUserData}/>}/>

            <Route path = "/home" 
                render = {() => <HomePage username={username}/>}/>

            <Route path = '/createAccount' exact
                render = {() => <CreateAccountForm handleUserCreated={setLoggedInUserData}/>}/>
                
            
            
        </Router>
    )
}

export default App;