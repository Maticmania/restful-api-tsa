import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.config.js";
import productRouter from "./src/routers/product.js";

dotenv.config();

const app = express();
const dbUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 8080;

app.use(express.json());

// Connect to the database
connectDB(dbUrl);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Restful API');
});

// API routes
app.use("/api/products", productRouter);

// Error handling for undefined routes
app.use((req, res,) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`RestfulAPI listening on port ${port}`);
});
