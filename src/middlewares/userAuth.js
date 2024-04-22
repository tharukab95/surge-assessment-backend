const userRepository = require("../repositories/userRepository");

//avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const usernameChecked = await userRepository.findByUsername(username);

    if (usernameChecked) {
      return res.status(409).json({ message: "username already taken" });
    }

    const emailChecked = await userRepository.findByEmail(email);

    if (emailChecked) {
      return res.status(409).json({ message: "Authentication failed" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveUser,
};
