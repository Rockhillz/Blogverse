const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const dbUrl = process.env.MONGODB_URL;

// Import Swagger for documentation
const { swaggerDocs, swaggerUi } = require("./swagger");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://web-blogverse.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Mount Routes on /api
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/analytics", analyticsRoutes);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Welcome to Blog Test server");
});

// Connect to MongoDB and Start Server (only in non-test environments)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Database connected");
      const port = 8020;
      app.listen(port, () => {
        console.log(`😍😍 Server running on port ${port} 🎉🥳`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
}

// Export app for testing
module.exports = app;
