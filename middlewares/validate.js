const validator = require("validator");
const { logger } = require("../logger");

/**
 * body must contain title(50 characters max),description(200 characters max)
 * tag is optional
 * use validator to validate and call next() to call the next middleware.
 */
const validateTaskData = (req, res, next) => {
  const { title, description, tags } = req.body;
  if (!title || !description) {
    res.status(400).json({
      data: "mandatory fields are: title and description.",
    });
    return;
  }
  if (title.trim().length < 3 || title.trim().length > 200) {
    res.status(400).json({
      data: "Title must contain more than 3 characters and less than 50 characters.",
    });
    return;
  }
  if (description.trim().length < 3 || description.trim().length > 2000) {
    res.status(400).json({
      data: "Description must contain more than 3 characters and less than 200 characters.",
    });
    return;
  }
  if (tags && tags.trim()) {
    let tagArray = tags.trim().split(" ");
    req.body.tags = tagArray;
  }

  if (!tags) {
    req.body.tags = [];
  }
  next();
};

module.exports = { validateTaskData };
