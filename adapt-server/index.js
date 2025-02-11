import "dotenv/config";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import http from "http"; // Import http module to wrap Express
import { Server } from "socket.io"; // Import Socket.IO
import authMiddleware from "./middleware/AuthMiddleware.js";
import { importantEmailRouter } from "./routes/importantEmailRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { qnaRouter } from "./routes/qnaRoutes.js";
import { fileUploadRouter } from "./routes/fileUploadRoutes.js";
import { sharedLibraryRouter } from "./routes/sharedLibraryRoutes.js";
import { lostAndFoundRouter } from "./routes/lnfRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import { saveMessage } from "./controller/chatController.js";

const app = express();
const httpServer = http.createServer(app); // Create HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

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

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/imp-emails", authMiddleware, importantEmailRouter);
app.use("/api/qna", authMiddleware, qnaRouter);
app.use("/api/shared-library", authMiddleware, sharedLibraryRouter);
app.use("/api/lost-and-found", authMiddleware, lostAndFoundRouter);
app.use("/api/chat", chatRouter);
app.use("/api/file", fileUploadRouter);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Join a specific room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Handle chat messages
  socket.on("send_message", async (data) => {
    console.log("Message received: ", data);

    try {
      // Save the message to the database
      await saveMessage(data);

      // Broadcast the message to the room
      io.to(data.room).emit("receive_message", data);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});

// Start the server
httpServer.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
