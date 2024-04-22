const User = require("../models/user-model");
const Comment = require("../models/commentModel");

const getComments = async (req, res) => {
  const laureateId = req.params.laureateId;

  try {
    const comments = await Comment.find({ laureateId }).exec();

    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addComment = async (req, res) => {
  const { laureateId, comment } = req.body;
  const username = req.user;

  try {
    const foundUser = await User.findOne({ username }).exec();

    const result = await Comment.create({
      userId: foundUser._id,
      username,
      laureateId,
      comment,
    });

    res.status(200).json({
      userId: result.userId,
      username: result.username,
      laureateId: result.laureateId,
      comment: result.comment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getComments,
  addComment,
};
