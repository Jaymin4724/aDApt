import { Router } from "express";
import {
  getAllCategories,
  getAllQuestions,
  createCategory,
  createQuestion,
  editCategory,
  editQuestion,
  deleteCategory,
  deleteQuestion,
} from "../controller/qnaController.js";

const qnaRouter = Router();

qnaRouter.get("/categories", getAllCategories);
qnaRouter.get("/questions", getAllQuestions);
qnaRouter.post("/category", createCategory);
qnaRouter.post("/question", createQuestion);
qnaRouter.patch("/category/:id", editCategory);
qnaRouter.patch("/question/:id", editQuestion);
qnaRouter.delete("/category/:id", deleteCategory);
qnaRouter.delete("/question/:id", deleteQuestion);
export { qnaRouter };
