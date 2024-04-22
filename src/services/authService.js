const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(username, email, password) {
  let hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw new Error("Invalid details");
  }

  console.log("user", JSON.stringify(user, null, 2));

  return user;
}

async function login(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  register,
  login,
};
