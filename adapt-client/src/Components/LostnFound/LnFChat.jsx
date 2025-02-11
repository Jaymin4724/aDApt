import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../../utils/socket";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import { ArrowBack, Send } from "@mui/icons-material";

const LnFChat = () => {
  const { id: room } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { username, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join_room", room);

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chat/${room}`);
        const data = await response.json();
        setChat(data);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchChatHistory();

    const handleReceiveMessage = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/lost-and-found/items",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const fetchedItems = response.data;
        setItems(fetchedItems);

        const foundItem = fetchedItems.find((i) => i._id === room);
        setSelectedItem(foundItem || null);
      } catch (err) {
        console.error("Failed to fetch lost & found items:", err);
      }
    };

    fetchItems();

    const item = items.find((i) => i._id === room);
    if (item) {
      setSelectedItem(item);
    }

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [room]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      room,
      author: username,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-5 min-h-fit bg-white shadow-md rounded-lg">
        <h2 className="flex items-center justify-start gap-2 text-xl font-semibold text-gray-800 mb-4">
          <ArrowBack
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-600 hover:text-blue-500"
          />
          {selectedItem ? selectedItem.name : "Loading..."}
        </h2>

        {selectedItem?.photo && (
          <div className="mb-4">
            <img
              src={selectedItem.photo}
              alt={selectedItem.name}
              className="w-full sm:w-[10rem] h-[10rem] sm:h-[10rem] rounded-lg object-cover mb-3"
            />
          </div>
        )}

        {selectedItem && (
          <div className="mb-4">
            <p className="text-gray-800">{selectedItem.description}</p>
          </div>
        )}

        <div className="border rounded-lg p-4 mb-4 min-h-[60vh] overflow-y-auto bg-gray-200">
          {chat.length ? (
            chat.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  msg.author === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 max-w-sm rounded-lg ${
                    msg.author === username
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-blue-300 text-black rounded-bl-none"
                  }`}
                >
                  <strong className="font-semibold">{msg.author}</strong>
                  <p>{msg.message}</p>
                  <em className="text-sm text-gray-600">{msg.time}</em>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <Send />
          </button>
        </div>
      </div>
    </>
  );
};

export default LnFChat;
