const mongoose = require("mongoose");

const STATUS_ENUMS = ["TODO", "IN_PROGRESS", "COMPLETED"];
const PRIORITY_ENUMS = ["LOW", "MEDIUM", "HIGH"];

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: String,
    status: { type: String, enum: STATUS_ENUMS, default: STATUS_ENUMS[0] },
    priority: { type: String, required: true, enum: PRIORITY_ENUMS },
    dueDate: Date,
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
