const fs = require("fs");
const jwt = require("jsonwebtoken");

const CustomError = require("../utils/CustomError");
const CatchAsync = require("../utils/CatchAsync");

const UsersData = fs.readFileSync(__dirname + "/../data/users.json");
const Users = JSON.parse(UsersData);

// login
exports.login = CatchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  const user = Users.find((user) => {
    if (user.email === email) return user;
    else if (user.username === email) return user;
  });

  //
  if (!user || user.password !== password) {
    return next(new CustomError("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // 30 days
  const expiryInMs = 30 * 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + expiryInMs);

  const options = { httpOnly: true, secure: true, expires };

  res.cookie("token", token, options);
  res.json({ status: "success", message: "", token, data: { user } });
});
