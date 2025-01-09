import { Router } from "express";
import {
  getAllEmails,
  createEmail,
  updateEmail,
  deleteEmail,
} from "../controller/ImportantEmailController.js";

const ImportantEmailRouter = Router();

ImportantEmailRouter.get("/", getAllEmails);
ImportantEmailRouter.post("/", createEmail);
ImportantEmailRouter.patch("/:id", updateEmail);
ImportantEmailRouter.delete("/:id", deleteEmail);

export { ImportantEmailRouter };
