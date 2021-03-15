import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  horizontalStretch: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

  }
}));

const Header  = ({username, loggedInUserID, signOut, navigateToUserProfile}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function handleNavigateToProfile() {
        handleClose();
        navigateToUserProfile(loggedInUserID);
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.horizontalStretch}>

                  <div>
                      <Button component={Link} to ={'/home'} color="inherit" variant='outlined' className={classes.title}>
                        Social Media App
                      </Button>
                  </div>

                  <div style={{justifySelf: 'end', alignContent: 'center'}}>
                      <Button 
                        style={{textTransform: 'none'}} 
                        color="inherit" 
                        aria-label="menu" 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={handleClick}
                      >
                        <AccountCircle style={{marginRight: '2px'}}/>
                          {username}
                        <ArrowDropDownIcon style={{marginLeft: '8px'}}/>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to={`/profile/${username}`} onClick={handleNavigateToProfile}>Profile</MenuItem>
                        <MenuItem component={Link} to={`/${username}/info`} onClick={handleClose}>Account</MenuItem>
                        <MenuItem component={Link} to={'/statistics'} onClick={handleClose}>App Stats</MenuItem>
                        <MenuItem component={Link} to={'/'} onClick={() => signOut()}>Logout</MenuItem>
                      </Menu>
                  </div>
                  
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;