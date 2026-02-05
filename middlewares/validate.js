const validator = require("validator");
const { logger } = require("../logger");

const validateTaskData = (req, res, next) => {
  try {
    /**
     * body must contain title(50 characters max),description(200 characters max)
     * tag is optional
     * use validator to validate and call next() to call the next middleware.
     */
    const { title, description, tags } = req.body;
    if (!title || !description) {
      res.status(400).json({
        data: "mandatory fields are: title and description.",
      });
      return;
    }
    if (title.trim().length < 3 || title.trim().length > 50) {
      res.status(400).json({
        data: "Title must conatain more than 3 characters and less than 50 characters.",
      });
      return;
    }
    if (description.trim().length < 3 || description.trim().length > 200) {
      res.status(400).json({
        data: "Description must conatain more than 3 characters and less than 50 characters.",
      });
      return;
    }
    if (tags.trim()) {
      let tagArray = tags.trim().split(" ");
      req.body.tags = tagArray;
    }

    if (!tags) {
      req.body.tags = [];
    }
    next();
  } catch (error) {
    res.status(500).json({ data: "something went wrong." });
    logger.error(error.messsage, {
      stack: error.stack,
    });
  }
};

module.exports = { validateTaskData };
