import express from "express";
import * as commentsController from "../controllers/commentsControllers.js";
const router = express.Router();

router.route("/")
  .get(commentsController.getComments)
  // .post(commentsController.addComment);

export default router;
