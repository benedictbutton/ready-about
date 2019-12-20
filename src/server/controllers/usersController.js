const mongoose = require('mongoose');
const User = require('../models/user');

const formatPhoneNumber = number => {
  let newNumber = number.split('').filter(char => /\d/.test(char));
  newNumber = newNumber.join('');
  return newNumber;
};

exports.imageUpload = async (req, res) => {
  try {
    const {
      payload: { id },
    } = req;
    const user = await User.findById(id);
    const image = req.file.key;
    user.avatar = image;
    await user.save();
    return res.json({ avatar: image });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};

exports.editUser = async (req, res) => {
  try {
    let { edit, editProp } = req.body.user;
    if (editProp === 'phoneNumber') edit = formatPhoneNumber(edit);
    const user = await User.findOneAndUpdate(
      { username: req.payload.username },
      { [editProp]: edit },
      { upsert: true, new: true },
    );
    return res.json({
      user,
      prop: { editField: editProp, edit },
    });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};
