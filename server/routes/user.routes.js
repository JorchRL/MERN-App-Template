import express from "express";

const router = express.Router();

router.route("/api/users").get().post();

router.route("/api/users/:userId").get().put().delete();

export default route;
