const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { validateFields } = require("./middlewares/validations");
const errorHandler = require("./middlewares/errors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// auth routes
app.use("/auth", require("./routes/auth.route"));

// task routes
app.use("/tasks", validateFields, require("./routes/task.route"));

// Not Found route
app.all("*", (_, res) => res.status(404).json({ message: "Not Found" }));

//  error handling
app.use(errorHandler);

module.exports = app;

// validation user input data
