// React core
import React, {useState, useEffect} from 'react';

// Routing 
import { Link, Redirect } from 'react-router-dom';

// api functions
import { authenticateUser } from '../../apiCallFunctions.js';

// material components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/VisibilityOff';
import indigo from '@material-ui/core/colors/indigo';

// js styling
import { makeStyles } from '@material-ui/core/styles';
import './SignIn.css';
import { LinkedCamera } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: `${indigo["50"]}`,
        justifySelf:'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    signInContainer: {
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
        gridTemplateColumns: '1fr 10fr',
        width: '100%',
        alignItems: "center"
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

const SignIn = ({handleUserLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const styles = useStyles();

    const verifyUserLogin = async (e) => {
        e.preventDefault();
        const resp = await authenticateUser(username, password);
        if(resp.success) {
            console.log(resp);
            setUserAuthenticated(true);
            handleUserLogin(resp.userData)
        } else {
            console.log(resp);
            alert(resp.message);
        }
    }
    useEffect(() => {
        //re renders the component if userAuthenticated value is changed, ie once the user is authenticated!
    },[userAuthenticated])
 


  return (
    <div className={styles.main}>
        <div className={styles.signInContainer}>
            <CssBaseline />
            <div className={styles.formWithLabel}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={styles.form} onSubmit={verifyUserLogin}>

                    <div className={styles.inputLine}>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField
                                onChange={event => setUsername(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="username"
                                autoFocus/>
                        </Grid>
                    </div>

                    <div className={styles.inputLine}>
                        <Grid item>
                            <Visibility />
                        </Grid>
                        <Grid item>
                            <TextField
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                        onClick={verifyUserLogin}
                    >
                        Sign In
                    </Button>
                    {userAuthenticated && <Redirect to='/home' /> }
                </form>

                <Grid>Or</Grid>

                <Button
                    component={Link}
                    to={'/createAccount'}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    className={styles.submit}>
                    Create an account
                </Button>
            </div>
      </div>
    </div>
  );
}


export default SignIn;