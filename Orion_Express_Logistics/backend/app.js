const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());


// Add CORS middleware
app.use(cors());


app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;


app.listen(PORT,()=>{
  console.log(`Server running on PORT 3001...`.white.bold)
});