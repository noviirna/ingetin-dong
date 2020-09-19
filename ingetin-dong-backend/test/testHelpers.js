const User = require(`../models/User`);
const { NODE_ENV } = process.env;

module.exports = {
  deleteAllUser: function() {
    if (NODE_ENV == "test") {
      User.deleteMany({})
        .then(deleted => {})
        .catch(err => {});
    }
  }
};
