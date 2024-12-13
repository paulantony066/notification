import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // Allowed methods
  })
);

// Middleware to set headers
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
  projectId: "familyevent-934de",
});

// Endpoint to send FCM notification
app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;

  // Validate if fcmToken is provided
  if (!receivedToken) {
    return res.status(400).json({
      error: "fcmToken is required in the request body",
    });
  }

  const message = {
    notification: {
      title: "Notification",
      body: "This is a test notification",
    },
    token: receivedToken,
  };

  // Send FCM notification
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Notification sent successfully",
        token: receivedToken,
      });
      console.log("Message sent successfully:", response);
    })
    .catch((error) => {
      res.status(500).json({
        error: "Failed to send notification",
        details: error.message,
      });
      console.error("Error sending message:", error);
    });
});

// Start the server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
