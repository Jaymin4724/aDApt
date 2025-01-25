import { Router } from "express";
import {
  getAllLostAndFoundCategories,
  getAllLostAndFoundItems,
  createLostAndFoundCategory,
  createLostAndFoundItem,
  editLostAndFoundCategory,
  editLostAndFoundItem,
  deleteLostAndFoundCategory,
  deleteLostAndFoundItem,
} from "../controller/lnfController.js";

const lostAndFoundRouter = Router();

lostAndFoundRouter.get("/categories", getAllLostAndFoundCategories);
lostAndFoundRouter.get("/items", getAllLostAndFoundItems);
lostAndFoundRouter.post("/category", createLostAndFoundCategory);
lostAndFoundRouter.post("/item", createLostAndFoundItem);
lostAndFoundRouter.patch("/category/:id", editLostAndFoundCategory);
lostAndFoundRouter.patch("/item/:id", editLostAndFoundItem);
lostAndFoundRouter.delete("/category/:id", deleteLostAndFoundCategory);
lostAndFoundRouter.delete("/item/:id", deleteLostAndFoundItem);

export { lostAndFoundRouter };
