const UserModel = require("../models/users");

const userLogin = (req, res) => {
  res.json({ message: "hello" });
};

const getUsers = (req, res) => {
  UserModel.find(null, null, (err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
};

const getUser = (req, res) => {
  res.json({ message: "hello" });
};

const updateUser = (req, res) => {
  res.json({ message: "hello" });
};

const createUser = (req, res) => {
  let UserEntity = new UserModel(req.body);

  UserEntity.save(err => {
    if (err) {
      res.json({ status: 0, message: err });
    }

    res.json({ status: 1, message: "user created" });
  });
};

module.exports = {
  userLogin,
  getUsers,
  getUser,
  updateUser,
  createUser
};
