const express = require("express");
const { validateUser, validateTaskData } = require("../middlewares/");
const {
  createTask,
  showAllTasks,
  getAll,
} = require("../controllers/taskController");
const taskRoute = express.Router();

/**
 * Create a task which takes title ,description,tags and userId and add createdAt and updateAt while storing in the mongodb.
 * Get all tasks for the requested user
 */

taskRoute.post("/create", validateUser, validateTaskData, createTask);

taskRoute.get("/show", validateUser, showAllTasks);

taskRoute.get("/", getAll);

module.exports = { taskRoute };
