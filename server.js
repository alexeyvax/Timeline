const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const config = require('./server/config/config');

config.setConfig();
mongoose.Promise = global.Promise;

const initController = require('./server/controllers/init');
const addNewEmpController = require('./server/controllers/addNewEmp');
const addNewProController = require('./server/controllers/addNewPro');
const addNewFillDayController = require('./server/controllers/addNewFillDay');
const removeFillDayController = require('./server/controllers/removeFillDay');
const saveNameEmpController = require('./server/controllers/saveNameEmp');
const saveNameProController = require('./server/controllers/saveNamePro');
const saveHoursController = require('./server/controllers/saveHours');
const removeEmpController = require('./server/controllers/removeEmp');
const removeProController = require('./server/controllers/removePro');

const addNewUserController = require('./server/controllers/addNewUser');
const authController = require('./server/controllers/authController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(`${__dirname}/build`));
app.use('/swagger.json', express.static(`${__dirname}/swagger.json`));

app.post('/api/auth-user', authController.auth);
app.post('/api/registration-new-user', addNewUserController.add);

app.use(jwt({
  secret: process.env.SECRET_KEY,
  getToken: (req) => {
    if (req.headers && req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    }
    return null;
  },
}));

app.get('/api/init-load-data', initController.init);
app.post('/api/add-new-employee', addNewEmpController.addNewEmployee);
app.post('/api/add-new-project', addNewProController.addNewProject);
app.post('/api/add-new-fill-day', addNewFillDayController.addDay);
app.put('/api/save-name-employee/:id', saveNameEmpController.save);
app.put('/api/save-name-project/:id', saveNameProController.save);
app.put('/api/save-hours/:id', saveHoursController.save);
app.delete('/api/remove-fill-day/:id', removeFillDayController.removeDay);
app.delete('/api/remove-employee/:id', removeEmpController.remove);
app.delete('/api/remove-project/:id', removeProController.remove);

mongoose.connect(process.env.MONGOOSE_CONNECT, { useMongoClient: true });
app.listen(9000, () => console.info('server running at http://localhost:9000/'));
