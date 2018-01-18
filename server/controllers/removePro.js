const User = require('../models/User');
const Project = require('../models/Project');

module.exports.remove = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    project.remove();
    await project.save();
    const currentUser = await User.findOne({ login: req.query.login }).populate([
      { path: 'employees', populate: { path: 'data' } },
      { path: 'projects' },
    ]);
    let isChangeEmployees = false;

    currentUser.employees.map(employee => employee.data.map((item) => {
      if (item.status === project.name) {
        item.remove();
        isChangeEmployees = true;
      }
    }));
    const saveUser = await currentUser.save();
    const user = await User.populate(saveUser, [
      { path: 'employees', options: { sort: { name: 1 } }, populate: { path: 'data' } },
      { path: 'projects', options: { sort: { name: 1 } } },
    ]);
    const doc = {
      projects: await user.projects,
      employees: (isChangeEmployees) ? await user.employees : null,
    };
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
  }
};
