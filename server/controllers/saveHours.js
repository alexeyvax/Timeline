const User = require('../models/User');
const FillDay = require('../models/fillDay');

module.exports.save = async (req, res) => {
  try {
    const { login, id, value } = req.body;
    const fillDay = await FillDay.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { hours: value } },
      { new: true }
    );
    const currentUser = await User.findOne({ login }).populate({
      path: 'employees',
      match: { _id: id },
      populate: { path: 'data' },
    });
    res.status(200).send(currentUser.employees[0]);
  } catch (error) {
    console.log(error);
  }
};
