import "dotenv/config";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import { ImportantEmailRouter } from "./routes/ImportantEmailRoutes.js";
const server = express();

main().catch((err) => {
  console.error("DB Connection failed: ", err);
});
async function main() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("mongooseeeeebumps --> DB Connected !!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}
server.use(cors());
server.use(express.json()); // bodyparser
server.use("/api/imp-emails", ImportantEmailRouter);

server.listen(process.env.PORT, () => {
  console.log(`server started at localhost:${process.env.PORT}`);
});
