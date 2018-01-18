const User = require('../models/User');
const Employee = require('../models/Employee');

module.exports.addNewEmployee = async (req, res) => {
  try {
    const { login, name } = req.body;
    const user = await User.findOne({ login });
    const newEmployee = new Employee({ name, login, data: [] });
    const employee = await newEmployee.save();
    await user.employees.push(employee._id);
    const doc = await user.save();
    const populatesDoc = await User.populate(doc, {
      path: 'employees',
      options: { sort: { name: 1 } },
      populate: { path: 'data' },
    });
    res.status(200).send(populatesDoc.employees);
  } catch (error) {
    console.log(error);
  }
};
