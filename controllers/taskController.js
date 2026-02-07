const { ObjectId } = require("mongodb");
const { storeTask, getAllTask, getTasks } = require("../services/taskService");
const { logger } = require("../logger");
/**
 * check userId in req
 * if it is not there then send 400 bad request error
 * else call the task service to store the task data and send the 201 created response.
 */
const createTask = async (req, res, next) => {
  const { userId } = req;
  const { title, description, tags } = req.body;
  if (!userId) {
    const error = new Error("User id is not found.");
    error.statusCode = 400;
    throw error;
  }
  const payload = {
    title,
    description,
    tags,
    userId: new ObjectId(userId),
  };
  const resFromDB = await storeTask(payload);
  res.status(201).json({ resFromDB });
};

/**
 * check userId in req
 * if it is not there then send 400 bad request error
 * else call the task service to get all the tasks data for the particular user.
 */
const showAllTasks = async (req, res, next) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 5;
  }
  limit = limit > 10 ? 5 : limit;
  const skip = page < 1 ? 0 : (page - 1) * limit;
  const { userId } = req;
  const resArray = await getAllTask(userId, skip, limit);
  res.json({ data: resArray });
};

const getAll = async (req, res, next) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 5;
  }
  limit = limit > 10 ? 5 : limit;
  const skip = page < 1 ? 0 : (page - 1) * limit;
  const resArray = await getTasks(skip, limit);
  res.json({ data: resArray });
};

module.exports = { createTask, showAllTasks, getAll };
