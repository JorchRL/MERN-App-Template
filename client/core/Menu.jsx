import React from "react";
import { IconButton, makeStyles, Button } from "@material-ui/core";

import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Home, HomeIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

import { auth } from "./../auth/auth-helper";

import { Link, useLocation, useNavigate } from "react-router-dom";

const isActive = (location, path) => {
  if (location.pathname == path) {
    return { color: "#ff4081" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = () => {
  // I will use hooks instead of withRouter HOC
  // history.location used to return the same object as the useLocation() hook
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();

  const signOut = () => {
    auth.clearJWT(() => navigate("/"));
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          KatoBook
        </Typography>

        <Link to='/'>
          <IconButton aria-label='Home' style={isActive(location, "/")}>
            <Home />
          </IconButton>
        </Link>

        <Link to='/users'>
          <Button style={isActive(location, "/users")}>Users</Button>
        </Link>
        {
          // Menu when no user is logged in
          !auth.isAuthenticated() && (
            <span>
              <Link to='/signup'>
                <Button style={isActive(location, "/signup")}>Sign Up</Button>
              </Link>
              <Link to='/signin'>
                <Button style={isActive(location, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )
        }
        {
          // Menu when the user is logged in
          auth.isAuthenticated() && (
            <span>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button
                  style={isActive(
                    location,
                    `/user/${auth.isAuthenticated().user._id}`
                  )}>
                  My Profile
                </Button>
              </Link>
              <Button color='inherit' onClick={signOut}>
                Sign Out
              </Button>
            </span>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "1em",
  },
});

export default Menu;
