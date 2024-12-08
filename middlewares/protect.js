const jwt = require("jsonwebtoken");
const fs = require("fs");

const CustomError = require("../utils/CustomError");
const CatchError = require("../utils/CatchAsync");

const UsersData = fs.readFileSync(__dirname + "/../data/users.json");
const Users = JSON.parse(UsersData);

module.exports = CatchError(async function (req, res, next) {
  //
  let token = req?.cookies?.token;

  // if token is empty then extract from headers
  if (!token && req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  }

  // if token is empty
  if (!token) throw new CustomError("Access denied", 400);

  // extract username from token
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  const findUser = Users.find((user) => user.username === decode.id);

  // if user not found
  if (!findUser) throw new CustomError("Please login again", 401);

  req.user = findUser;

  next();
});
