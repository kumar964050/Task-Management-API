const mongoose = require("mongoose");
const CustomError = require("../utils/CustomError");

const PRIORITY_ENUMS = ["LOW", "MEDIUM", "HIGH"];
const STATUS_ENUMS = ["TODO", "IN_PROGRESS", "COMPLETED"];

const isValidPriority = (priority) => PRIORITY_ENUMS.includes(priority);
const isValidStatus = (status) => STATUS_ENUMS.includes(status);
const isValidParams = (id) => mongoose.Types.ObjectId.isValid(id);

const validateFields = (req, res, next) => {
  let { status, priority } = req.body;

  if (priority && !isValidPriority(priority)) {
    throw new CustomError("Invalid priority value", 400);
  }
  if (status && !isValidStatus(status)) {
    throw new CustomError("Invalid Status value", 400);
  }
  status = req.query.status;
  priority = req.query.priority;
  if (priority && !isValidPriority(priority)) {
    throw new CustomError("Invalid priority value", 400);
  }
  if (status && !isValidStatus(status)) {
    throw new CustomError("Invalid Status value", 400);
  }

  next();
};

const validateParams = (req, res, next) => {
  if (!isValidParams(req.params.id)) {
    throw new CustomError("Invalid task ID", 400);
  }
  next();
};

module.exports = {
  validateFields,
  validateParams,
  isValidParams,
  isValidPriority,
  isValidStatus,
};
