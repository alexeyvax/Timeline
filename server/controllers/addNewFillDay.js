const User = require('../models/User');
const FillDay = require('../models/fillDay');

module.exports.addDay = async (req, res) => {
  try {
    const { login, id, status, year, month, number } = req.body;
    const currentUser = await User.findOne({ login }).populate({
      path: 'employees',
      match: { _id: id },
      populate: { path: 'data' },
    });
    const person = currentUser.employees[0];
    let isExesistDay = false;

    const checkItemStatus = (item) => {
      if (item.status === status) {
        isExesistDay = true;
      } else {
        item.remove();
      }
    };

    person.data.find((item) => {
      if (item.year === year
        && item.month.name === month.name
        && item.number === number) {
        checkItemStatus(item);
        return true;
      }
      return false;
    });

    if (!isExesistDay) {
      const newFillDay = await new FillDay(req.body);
      const docFillDay = await newFillDay.save();
      await person.data.push(docFillDay._id);
      await person.save();

      const doc = await currentUser.save();
      const populatesDoc = await User.populate(doc, {
        path: 'employees',
        populate: { path: 'data' },
      });
      return res.status(200).send(populatesDoc.employees[0]);
    }
    res.status(304).send({});
  } catch (error) {
    console.log(error);
  }
};
