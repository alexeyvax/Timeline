module.exports.setConfig = () => {
  process.env.MONGOOSE_CONNECT = 'mongodb://localhost:27017/timeline-test';
  process.env.SECRET_KEY = 'secretKey';
};
