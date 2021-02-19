import React from 'react';
import Button from '@material-ui/core/Button';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import SignIn from './components/SignIn/SignIn.js';
import HomePage from './components/Homepage/HomePage.js';

const App = () => {
    return (
        <Router>
            <Route path = "/" exact 
                render = {() => <SignIn />}/>
            <Route path = "/home" 
                render = {() => <HomePage />}/>
            
            
        </Router>
    )
}

export default App;