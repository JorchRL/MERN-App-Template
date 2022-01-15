import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";

import DeleteUser from "./DeleteUser.jsx";
import { auth } from "../auth/auth-helper";
import { read } from "./api-user";

const Profile = () => {
  // As we are using react-router v6, we have to use the useParams() hook instead of the "match" prop
  const params = useParams();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  // auth.isAuthenticated checks in sessionStorage for a JWT
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    // console.log("userId: ", params.userId);
    read({ userId: params.userId }, { t: jwt.token }, signal).then((data) => {
      // console.log(data);
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [params]);

  if (redirectToSignin) {
    return <Navigate to='/signin' replace={true} />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant='h6' className={classes.title}>
        {auth.isAuthenticated().user &&
        auth.isAuthenticated().user._id === user._id
          ? "My Profile"
          : "Profile"}
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label='Edit' color='primary'>
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

export default Profile;
