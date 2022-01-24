const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
//db
const db = require("./db/sync");
db();
//
const userRoute = require("./route/userRoute/user");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
