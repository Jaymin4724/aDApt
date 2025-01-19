import { QnACategory, QnAQuestion } from "../model/qnaModel.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await QnACategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await QnAQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error fetching questions:", error);
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const newCategory = new QnACategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { question, description, category, createdBy } = req.body;
  if (!question || !category || !createdBy) {
    return res
      .status(400)
      .json({ error: "Question, category, and createdBy are required" });
  }

  try {
    const newQuestion = new QnAQuestion({
      question,
      description,
      createdBy,
      category,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log("Error creating question:", error);
    res.status(500).json({ error: error.message });
  }
};

export { getAllCategories, getAllQuestions, createCategory, createQuestion };
