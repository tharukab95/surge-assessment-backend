const db = require("../models");
const User = db.users;

async function findByUsername(username) {
  return await User.findOne({ where: { username } });
}

async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function create(user) {
  return await User.create(user);
}

module.exports = {
  findByUsername,
  findByEmail,
  create,
};
