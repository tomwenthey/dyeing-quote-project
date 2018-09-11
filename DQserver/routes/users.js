const UserModel = require("../models/users");

const userLogin = (req, res) => {
  let rs = { status: 0 };
  const { username, password } = req.body;
  if (!username || !password) {
    rs.message = "用户名或密码不能为空";
    res.json(rs);
  } else {
    UserModel.findOne({ username }).exec((err, user) => {
      if (err) {
        rs.message = err.message;
        res.json(rs);
      }
      if (user) {
        if (user.comparePassword(password)) {
          rs.status = 1;
          rs.user = user;
          rs.message = "登录成功";
        } else {
          rs.message = "用户名或密码错误";
        }
      } else {
        rs.message = "用户名不存在";
      }
      res.json(rs);
    });
  }
};

const getUsers = (req, res) => {
  let rs = { status: 0 };
  UserModel.find(null, null, (err, users) => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      rs.data = users;
    }

    res.json(rs);
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  let rs = { status: 0 };

  UserModel.findById({ _id: id }, (err, user) => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      rs.data = user;
    }

    res.json(rs);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  let rs = { status: 0 };
  const { name, phone, email } = req.body;

  UserModel.updateOne({ _id: id }, { name, phone, email }, err => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      rs.message = "更新成功";
    }
    res.json(rs);
  });
};

const createUser = (req, res) => {
  const UserEntity = new UserModel(req.body);
  UserModel.findOne({ username: req.body.username }, (err, row) => {
    if (row) {
      res.json({ status: 0, message: "用户名已存在" });
    } else {
      UserEntity.save(err => {
        if (err) {
          res.json({ status: 0, message: err.message });
        }

        res.json({ status: 1, message: "注册成功" });
      });
    }
  });
};

module.exports = {
  userLogin,
  getUsers,
  getUser,
  updateUser,
  createUser
};
