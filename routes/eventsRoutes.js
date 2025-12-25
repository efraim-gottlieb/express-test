import express from "express";
import * as eventsController from "../controllers/eventsControllers.js";
const router = express.Router();

router.route("/creator")
  .post(eventsController.createEvent)


export default router;
