import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  // Note: you might not want the GET /api/users to be available to anyone,
  // as this will expose the emails of your users. In that case, you might want
  // to add an "isAdmin" authorization to this route
  .get(userCtrl.list)
  // And make it impossible for anyone to create a user with isAdmin = true, of course...
  .post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default route;
