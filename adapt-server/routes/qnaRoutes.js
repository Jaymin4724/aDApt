import { Router } from "express";
import {
  getAllCategories,
  getAllQuestions,
  createCategory,
  createQuestion,
} from "../controller/qnaController.js";

const qnaRouter = Router();

qnaRouter.get("/categories", getAllCategories);
qnaRouter.get("/questions", getAllQuestions);
qnaRouter.post("/category", createCategory);
qnaRouter.post("/question", createQuestion);
export { qnaRouter };
