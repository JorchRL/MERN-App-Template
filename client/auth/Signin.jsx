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

import React, { useState } from "react";

import { signin } from "./api-auth.js";
import { auth } from "./auth-helper.js";
import { Navigate } from "react-router-dom";

const Signin = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    // console.log(values);
    setValues({ ...values, [name]: event.target.value });
  };

  // const { from } = props.location.state || {
  //   from: {
  //     pathname: "/",
  //   },
  // };
  const { redirectToReferer } = values;

  if (redirectToReferer) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Sign In
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin='normal'></TextField>
        <br />
        <TextField
          id='password'
          type='password'
          label='Password'
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin='normal'></TextField>
        <br />
        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
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
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
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

export default Signin;
