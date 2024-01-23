const chatUser = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setCookies = (token, res) => {
  const cookieAttributes = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_LIFE_SPAN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieAttributes);
};

exports.signup = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await chatUser.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ message: "This username already exists! Please find another" });
    }

    const newUser = await chatUser.create({
      name: req.body.full_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });

    const token = getToken(newUser._id);

    setCookies(token, res);
    newUser.password = undefined;

    res.status(201).json({
      status: "persisted",
      token,
      data: {
        chatUser: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "signup failure",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password requirements not met" });
    }
    const user = await chatUser.findOne({ username }).select("+password");

    if (!user || !(await user.checkPasswords(password, user.password))) {
      return res
        .status(400)
        .json({ error: "wrong password or user doesn't exist" });
    }

    const token = getToken(user._id);

    setCookies(token, res);

    res.status(200).json({
      status: "login successful",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "login failure",
      error: err.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "loggedOut" });
};
