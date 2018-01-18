const User = require('../models/User');

module.exports.add = async (req, res) => {
  try {
    const { login, passwd } = req.body;
    const listOfUsers = await User.find({});
    const isUserExists = listOfUsers.find(u => u.login === login);

    switch (true) {
      case (login && passwd && !isUserExists):
        const user = await new User(req.body);
        await user.save();
        res.status(200).send('You have added a new user');
        break;
      case !!isUserExists:
        res.status(201).send('This user have already exists');
        break;
      default: res.status(400).send();
    }
  } catch (error) {
    console.log(error);
  }
};
