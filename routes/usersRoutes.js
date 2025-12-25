import express from "express";
import * as usersController from "../controllers/usersControllers.js";
const router = express.Router();

router.route("/register")
  .post(usersController.addUser);

router.route("/tickets/buy")
  .post(usersController.buyTickets)
export default router;
