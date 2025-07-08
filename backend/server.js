const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    /\.vercel\.app$/, // Allow all .vercel.app subdomains
    /\.netlify\.app$/, // Just in case you switch to Netlify
    "https://trello-1-67ax.onrender.com", // Your own backend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Connect to DB
connectDB();

// Routes
app.use("/boards", boardRoutes);
app.use("/", taskRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
