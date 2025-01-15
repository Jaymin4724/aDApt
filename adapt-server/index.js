import "dotenv/config";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import { importantEmailRouter } from "./routes/importantEmailRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import authMiddleware from "./middleware/AuthMiddleware.js";
const server = express();

main().catch((error) => {
  console.error("DB Connection failed: ", error);
});

async function main() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("mongooseBumps --> DB Connected!!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}

server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/imp-emails", authMiddleware, importantEmailRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
