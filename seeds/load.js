require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");

const TasksModel = require("../models/task.model");

const tasks = JSON.parse(
  fs.readFileSync(__dirname + "/../data/tasks.json", "utf8")
);

const removeAndLoadData = async () => {
  console.log("");
  console.log("Deleting tasks...");
  await TasksModel.deleteMany({});
  console.log("Tasks data deleted successfully");
  console.log("Seeding Tasks...");
  await TasksModel.create(tasks);
  console.log("Tasks data seeded successfully");
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database created successfully");
    await removeAndLoadData();
    console.log();
  } catch (error) {
    console.error("Error during seeding process:", error);
  } finally {
    mongoose.connection.close();
    console.log("Process finished");
  }
};

seedDatabase();
