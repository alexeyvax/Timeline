const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.auth = async (req, res) => {
  try {
    const { login, passwd } = req.body;
    if (!login || !passwd) {
      res.status(400).send('Bad request');
    }

    const user = await User.findOne({ login, passwd });
    if (!user) {
      res.status(404).send('No such user');
    }

    const data = { login, passwd };
    const token = await jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '8h' });

    if (token) {
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
  }
};
