const User = require('../models/User');
const FillDay = require('../models/fillDay');

module.exports.removeDay = async (req, res) => {
  try {
    const currentDay = await FillDay.findById({ _id: req.params.id });

    currentDay.remove();
    await currentDay.save();

    const doc = await User.findOne({ login: req.query.login }).populate({
      path: 'employees',
      match: { _id: req.query.employee },
      options: { sort: { name: 1 } },
      populate: { path: 'data' },
    });
    res.status(200).send(doc.employees[0]);
  } catch (error) {
    console.log(error);
  }
};
