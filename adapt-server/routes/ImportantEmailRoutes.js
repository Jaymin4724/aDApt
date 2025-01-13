import { Router } from "express";
import {
  getAllEmails,
  createEmail,
  updateEmail,
  deleteEmail,
} from "../controller/importantEmailController.js";

const importantEmailRouter = Router();

// Define routes for important emails
importantEmailRouter.get("/", getAllEmails);
importantEmailRouter.post("/", createEmail);
importantEmailRouter.patch("/:id", updateEmail);
importantEmailRouter.delete("/:id", deleteEmail);

export { importantEmailRouter };
