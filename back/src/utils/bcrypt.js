const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
};
