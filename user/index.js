require("dotenv").config();

const port = process.env.PORT;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// Set up routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/", userRoutes);


mongoose.set("strictQuery", false);
// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`User is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
