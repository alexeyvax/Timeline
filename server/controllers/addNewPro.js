const User = require('../models/User');
const Project = require('../models/Project');

module.exports.addNewProject = async (req, res) => {
  try {
    const { login, name } = req.body;
    const user = await User.findOne({ login });
    const projects = await Project.find();
    const getColor = () =>
      `#${(0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)}`;
    /* if color isn't set then random generate color */
    let color = req.body.color;
    let coincidence = true;
    while (coincidence) {
      color = (color) ? color : getColor();
      coincidence = projects.find(i => i.color === color);
      if (!coincidence) {
        coincidence = false;
      } else {
        color = null;
      }
    }
    const newProject = new Project({ name, color });
    const project = await newProject.save();
    await user.projects.push(project._id);
    const doc = await user.save();
    const populatesDoc = await User.populate(doc, {
      path: 'projects',
      options: { sort: { name: 1 } },
    });
    res.status(200).send(populatesDoc.projects);
  } catch (error) {
    console.log(error);
  }
};
