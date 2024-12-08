require("dotenv").config(); // load env variables
require("./config/database").connect(); // connect to database

// unhandled Exception
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.message);
  process.exit(1);
});

const app = require("./app");
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  process.exit(1);
});
