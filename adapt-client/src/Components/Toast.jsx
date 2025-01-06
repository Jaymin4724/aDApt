import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

// Show success toast
const Success = (message) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: "whitesmoke", // Light background for success
      color: "#423e73", // Dark text color
    },
  });
};

// Show error toast
const Error = (message) => {
  toast.error(message, {
    duration: 3000,
    style: {
      background: "whitesmoke", // Red background for errors
      color: "#423e73", // Dark text color
    },
  });
};

// Show info toast
const Info = (message) => {
  toast(message, {
    duration: 3000,
    style: {
      background: "#3498db", // Blue background for info
      color: "#fff", // White text color
    },
  });
};

// Show confirm alert
const Confirm = (message, onConfirm, onCancel) => {
  confirmAlert({
    title: "Confirm Action",
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: onConfirm,
        style: {
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontSize: "medium",
          padding: "10px 25px",
          cursor: "pointer",
          fontWeight: "bold",
        },
      },
      {
        label: "No",
        onClick: onCancel,
        style: {
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontSize: "medium",
          padding: "10px 25px",
          cursor: "pointer",
          fontWeight: "bold",
        },
      },
    ],
    overlayClassName: "overlay-custom",
    closeOnEscape: true,
    closeOnClickOutside: true,
  });
};

export { Success, Error, Info, Confirm };
