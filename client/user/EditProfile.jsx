import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { auth } from "../auth/auth-helper";
import { read, update } from "./api-user";

const EditProfile = () => {
  const params = useParams();

  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: params.userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          error: "",
        });
      }
    });

    return () => {
      abortController.abort();
    };
  }, [params]);

  const clickSubmit = () => {
    // const user = {name, email, password}
    // update(userId, jwt.token, user)
    // setVaues(userId=data._id, redirect=true)
    // console.log("Edit user profile XD");
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    update({ userId: params.userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // console.log(data._id);
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToProfile) {
    return <Navigate to={`/user/${values.userId}`} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Edit Profile
        </Typography>
        <TextField
          id='name'
          label='name'
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margins='normal'
        />
        <br />
        <TextField
          id='email'
          label='email'
          type='email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margins='normal'
        />
        <br />
        <TextField
          id='password'
          label='password'
          type='password'
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margins='normal'
        />
        <br />
        {values.error && (
          <Typography
            component='p'
            color='error'
            className={classes.errorContainer}>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {" " + values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  errorContainer: {
    marginTop: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default EditProfile;
