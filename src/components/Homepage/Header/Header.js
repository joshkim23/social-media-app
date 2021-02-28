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

const Header  = ({username, signOut}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSignOut = () => signOut();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.horizontalStretch}>

                  <div>
                    <Typography variant="h4" className={classes.title}>
                      Social Media App
                    </Typography>
                  </div>

                  <div style={{justifySelf: 'end'}}>
                    <Button color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                      {username}
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
                      <MenuItem component={Link} to={`/${username}`} onClick={handleClose}>Profile</MenuItem>
                      <MenuItem component={Link} to={`/${username}/info`} onClick={handleClose}>Account</MenuItem>
                      <MenuItem component={Link} to={'/statistics'} onClick={handleClose}>App Stats</MenuItem>
                      <MenuItem component={Link} to={'/'} onClick={handleSignOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                  
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;