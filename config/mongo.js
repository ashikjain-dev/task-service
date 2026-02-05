const { MongoClient } = require("mongodb");
const { logger } = require("../logger");
let db, client;
const URI = process.env.MONGODB_CONNECTION_STRING;

async function connectToMongoDB(params) {
  try {
    if (!URI) {
      logger.info("Not able to fecth connection string");
    }
    client = await MongoClient.connect(URI, {
      maxPoolSize: 40,
      minPoolSize: 10,
    });
    logger.info("Connection to mongodb is successful.");
    db = client.db("to-do");
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function getDB() {
  try {
    if (!db) {
      await connectToMongoDB();
    }
    logger.info("Access to DB is successful.");
    return db;
  } catch (error) {
    logger.error(error.message, {
      stack: error.stack,
    });
  }
}

module.exports = { connectToMongoDB, getDB };
