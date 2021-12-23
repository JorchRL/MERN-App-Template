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

// helpers
const requireSignin = undefined; //temp

const hasAuthorization = (req, res) => {};

export default {
  signin,
  signout,
};
