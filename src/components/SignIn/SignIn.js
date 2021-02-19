import React from 'react';

// Routing 
import { Link } from 'react-router-dom';

// api functions

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

// js styling
import { makeStyles } from '@material-ui/core/styles';
import './SignIn.css';



const useStyles = makeStyles((theme) => ({
    main: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: '#f7f1e3',
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
    paper: {
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

const SignIn = () => {
    const classes = useStyles();

  return (
    <div className={classes.main}>
        <div className={classes.signInContainer}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} noValidate>

                    <div className={classes.inputLine}>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="username"
                            autoFocus/>
                        </Grid>
                    </div>

                    <div className={classes.inputLine}>
                        <Grid item>
                            <Visibility />
                        </Grid>
                        <Grid item>
                            <TextField
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
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>

                <Grid>Or</Grid>

                <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    className={classes.submit}>
                    Create an account
                </Button>
            </div>
      </div>
    </div>
  );
}


export default SignIn;