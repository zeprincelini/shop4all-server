const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
//db
const db = require("./db/sync");
db();
//routes import
const authRoute = require("./route/authRoute/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
