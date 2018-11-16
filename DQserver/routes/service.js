const ServiceModel = require("../models/service");

const serviceLogin = (req, res) => {
  let rs = { status: 0 };
  const { username, password } = req.body;
  if (!username || !password) {
    rs.message = "用户名或密码不能为空";
    res.json(rs);
  } else {
    ServiceModel.findOne({ username }).exec((err, user) => {
      if (err) {
        rs.message = err.message;
        res.json(rs);
      }
      if (user) {
        if (user.comparePassword(password)) {
          rs.status = 1;
          rs.user = {
            sid: user._id,
            name: "客服",
            img: "http://localhost:4000/images/service.jpg"
          };
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

const createService = (req, res) => {
  const ServiceEntity = new ServiceModel(req.body);
  ServiceModel.findOne({ username: req.body.username }, (err, row) => {
    if (row) {
      res.json({ status: 0, message: "用户名已存在" });
    } else {
      ServiceEntity.save(err => {
        if (err) {
          res.json({ status: 0, message: err.message });
        }
        res.json({ status: 1, message: "注册成功", user: ServiceEntity });
      });
    }
  });
};

module.exports = {
  serviceLogin,
  createService
};
