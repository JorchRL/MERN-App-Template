import User from "./user.controller";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

// auth/
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    // user.authenticate() is defined on our User model
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .json({ error: "Email and password do not match" });
    }

    // If we reach this point we have succesfully authenticated the user. 
    // Next we want to generate a JWT and a cookie containing it
    const token = jwt.sign({_id = user._id}, config.jwtSecret);
    res.cookie('t', token, {expire: new Date() + 9999})

    // Finally send both the token and the user as json
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    return res.status(401).json({ error: "Could not sign in!" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "Successfully signed out"
  })
};

// Authorization middleware

// Routes that require authentication use this
const requireSignin = expressJwt({
  // Check if JWT is valid, if it is, attach the auth, which contains the 
  // authenticated user _id, to the request.
  // express-jwt will throw an "Unauthorized Error" when a token cannot be validated
  secret: config.jwtSecret,
  userProperty: auth,
});

// Routes that require authorization use this
const hasAuthorization = (req, res,next) => {
  // Check whether the request passed through userById() and requireSignin()
  // if so, check that both _id's are the same. If so, the user making the request
  // is authorized
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id

  if (!authorized) {
    res.status(403).json({error: "User is not authorized!"})
  }

  // Continue with next middleware
  next()
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
};
