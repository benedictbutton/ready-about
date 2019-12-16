const mongoose = require("mongoose");
const User = require("../models/user");

exports.imageUpload = async (req, res) => {
  try {
    const {
      payload: { id }
    } = req;
    const user = await User.findById(id);
    let image = req.file.key;
    user.avatar = image;
    await user.save();
    return res.json({ avatar: image });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};

exports.addPhoneNumber = async (req, res) => {
  try {
    const { username } = req.payload;
    const { phoneNumber } = req.body;
    const user = await User.findOneAndUpdate(
      { username: username },
      { phoneNumber: phoneNumber },
      { upsert: true, new: true }
    );
    console.log(user);
    return res.json({ user });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};
