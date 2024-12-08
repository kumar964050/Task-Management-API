const Tasks = require("../models/task.model");
const CustomError = require("../utils/CustomError");
const CatchAsync = require("../utils/CatchAsync");

// add new task
exports.addTask = CatchAsync(async (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  // fields checking
  if (!(title && priority)) {
    return next(new CustomError("Title and priority are required", 400));
  }

  // Create a new task
  const newTask = await Tasks.create({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  res.status(201).json({
    status: "success",
    message: "Task created successfully",
    data: { task: newTask },
  });
});

// get all tasks
exports.getTasks = CatchAsync(async (req, res) => {
  const { status, priority, sort = "createdAt", limit, skip } = req.query;
  // Filtering tasks by status and priority
  const query = { is_deleted: false };
  if (status) query.status = status;
  if (priority) query.priority = priority;

  const skipNum = Number(skip) > 0 ? Number(skip) : 1;
  const perPage = Number(limit) > 0 ? Number(limit) : 10;
  const page = (skipNum - 1) * perPage;

  // todo :
  // need to improve sort sort({createdAt : 1})
  // 1 for asc , -1 for desc

  const tasksQuery = Tasks.find(query).sort(sort).skip(page).limit(perPage);
  const tasks = await tasksQuery;

  res.json({
    status: "success",
    message: "fetched tasks successfully",
    results: tasks.length,
    data: { tasks },
  });
});

// get task by id
exports.getTaskById = CatchAsync(async (req, res, next) => {
  const task = await Tasks.findOne({ _id: req.params.id, is_deleted: false });
  if (!task) return next(new CustomError("Task not found", 404));

  res.json({
    status: "success",
    message: "fetched task successfully",
    data: { task },
  });
});

// update a task
exports.updateTask = CatchAsync(async (req, res, next) => {
  const task = await Tasks.findOneAndUpdate(
    { _id: req.params.id, is_deleted: false },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) return next(new CustomError("Task not found", 404));

  res.json({
    status: "success",
    message: "task updated successfully",
    data: { task },
  });
});

// delete a task
exports.deleteTask = CatchAsync(async (req, res, next) => {
  const task = await Tasks.findOneAndUpdate(
    { _id: req.params.id, is_deleted: false },
    { is_deleted: true },
    { new: true }
  );
  if (!task) return next(new CustomError("Task not found", 404));
  res.status(204).end();
});
