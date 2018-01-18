const User = require('../models/User');

module.exports.init = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.query.login })
      .populate([{
        path: 'employees',
        options: { sort: { name: 1 } },
        populate: { path: 'data' },
      }, {
        path: 'projects',
        options: { sort: { name: 1 } },
      }]);
    const doc = {
      employees: await user.employees,
      projects: await user.projects,
    }
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
  }
};
