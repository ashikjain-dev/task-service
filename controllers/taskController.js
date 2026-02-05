const { ObjectId } = require("mongodb");
const { storeTask, getAllTask, getTasks } = require("../services/taskService");
const { logger } = require("../logger");
const createTask = async (req, res, next) => {
  /**
   * check userId in req
   * if it is not there then send 400 bad request error
   * else call the task service to store the task data and send the 201 created response.
   */
  try {
    const { userId } = req;
    const { title, description, tags } = req.body;
    if (!userId) {
      res.status(400).json({ data: "User id is not found." });
      return;
    }
    const payload = {
      title,
      description,
      tags,
      userId: new ObjectId(userId),
    };
    const resFromDB = await storeTask(payload);
    res.status(201).json({ resFromDB });
  } catch (error) {
    res.status(500).json({ data: "something went wrong." });
    logger.error(error.messsage, {
      stack: error.stack,
    });
  }
};

const showAllTasks = async (req, res, next) => {
  /**
   * check userId in req
   * if it is not there then send 400 bad request error
   * else call the task service to get all the tasks data for the particular user.
   */
  try {
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
  } catch (error) {
    res.status(500).json({ data: "something went wrong." });
    logger.error(error.messsage, {
      stack: error.stack,
    });
  }
};

const getAll = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({ data: "something went wrong." });
    logger.error(error.messsage, {
      stack: error.stack,
    });
  }
};

module.exports = { createTask, showAllTasks, getAll };
