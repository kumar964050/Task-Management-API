const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("DB Error"));
};
