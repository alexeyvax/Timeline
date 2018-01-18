const User = require('../models/User');
const Project = require('../models/Project');

module.exports.save = async (req, res) => {
  try {
    const oldProject = await Project.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ login: req.body.login }).populate({
      path: 'employees',
      populate: { path: 'data' },
    });
    const projects = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    let isChangeEmployees = false;

    currentUser.employees.map(employee => employee.data.map((item) => {
      if (item.status === oldProject.name) {
        item.status = req.body.name;
        item.save();
        isChangeEmployees = true;
      }
    }));
    const saveUser = await currentUser.save();
    const user = await User.populate(saveUser, [
      { path: 'employees', options: { sort: { name: 1 } }, populate: { path: 'data' } },
    ]);
    const doc = {
      project: await projects,
      employee: (isChangeEmployees) ? await user.employees : null,
    };
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
  }
};
