import React, {useState, useEffect} from 'react';

import { Link, Redirect } from 'react-router-dom';

import { createNewAccount } from '../apiCallFunctions.js'

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    main: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: '#f7f1e3',
        justifySelf:'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px 30px',
        borderRadius: '10px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        width: 400,
        justifySelf:'center',
    },
    formWithLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputLine: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        width: '100%',
        alignItems: "center"
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    }
}))

const CreateAccountForm = ({handleUserCreated}) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [usernameVerified, setUsernameVerified] = useState(false);

    const styles = useStyles();

    const createUserLogin = async(event) => {
        event.preventDefault();

        const resp = await createNewAccount(username, firstName, lastName, city, password);
        if(resp.success) {
            console.log(resp);
            setUsernameVerified(true);
            handleUserCreated(resp.userData);
        } else {
            console.log(resp);
            alert(resp.message);
        }
    }

    useEffect(() =>{}, [usernameVerified]);

    // TO DO - add validation for the username, green check mark to verify that it's good, second password field with verification? maybe two halves of the user data top half is username and password then bottom is personal details? snackbar for alert, some gif component for redirecting.... something like that
    return (
        <div className={styles.main}>
            <div className={styles.formContainer}>
                <div className={styles.formWithLabel}>
                    <Typography component="h1" variant="h5">
                        Create an Account
                    </Typography>
                    <form className={styles.form}>
                        <div className={styles.inputLine}>
                            <TextField
                                onChange={event => setUsername(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="desired username"
                                autoFocus
                            />
                        </div>

                        <div className={styles.inputLine}>
                            <TextField
                                onChange={event => setFirstName(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="First Name"
                            />
                        </div>

                        <div className={styles.inputLine}>
                            <TextField
                                onChange={event => setLastName(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Last Name"
                            />
                        </div>

                        <div className={styles.inputLine}>
                            <TextField
                                onChange={event => setCity(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="City"
                            />
                        </div>

                        <div className={styles.inputLine}>
                            <TextField
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                id="password"
                            />
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                            onClick={createUserLogin}
                        >
                            Create Account
                        </Button>
                        {usernameVerified && <Redirect to='/home'/>}
                    </form>

                    <Grid>Or</Grid>

                    <Button
                        component={Link}
                        to={'/'}
                        variant="outlined"
                        fullWidth
                        color="primary"
                        className={styles.submit}>
                        Back to Sign In
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountForm;