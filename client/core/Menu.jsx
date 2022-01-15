import React from "react";
import { makeStyles } from "@material-ui/core";

import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { HomeIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import auth from "./../auth/auth-helper";

import { Link, withRouter } from "react-router-dom";

const Menu = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>MERN App</Typography>
        <Link className={classes.link} to='/users'>
          Users
        </Link>
        <Link className={classes.link} to='/signup'>
          Sign Up
        </Link>
        <Link className={classes.link} to='/signin'>
          Sign In
        </Link>
        <Link className={classes.link} to='/user/1'>
          Profile-Example
        </Link>
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
