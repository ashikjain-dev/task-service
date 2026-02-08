const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");
const { logger } = require("../logger");

const storeTask = async (data) => {
  try {
    if (!data) {
      throw new Error("payload is undefined");
    }
    const payload = { ...data, createdAt: new Date(), updatedAt: new Date() };
    const db = await getDB();
    const resFromDB = await db.collection("tasks").insertOne(payload);
    return resFromDB;
  } catch (error) {
    logger.error(error.message, {
      stack: error.stack,
    });
  }
};

const getAllTask = async (userId, skip, limit) => {
  try {
    const db = await getDB();
    const resFromDB = await db
      .collection("tasks")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .project({
        title: 1,
        description: 1,
        tags: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
      })
      .toArray();
    return resFromDB;
  } catch (error) {
    logger.error(error.message, {
      stack: error.stack,
    });
  }
};

const getTasks = async (skip, limit) => {
  try {
    const db = await getDB();
    const resFromDB = await db
      .collection("tasks")
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .project({
        title: 1,
        description: 1,
        tags: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
      })
      .toArray();
    return resFromDB;
  } catch (error) {
    logger.error(error.message, {
      stack: error.stack,
    });
  }
};

const removeTask = async (taskId, userId) => {
  try {
    const db = await getDB();
    const resFromDB = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(taskId), userId: new ObjectId(userId) });
    return resFromDB;
  } catch (error) {
    logger.error(error.message, {
      stack: error.stack,
    });
  }
};

module.exports = { storeTask, getAllTask, getTasks, removeTask };
