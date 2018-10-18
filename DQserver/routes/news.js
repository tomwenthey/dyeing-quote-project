const NewsModel = require("../models/news");

const getLatestNews = (req, res) => {
  const { id } = req.params;
  let rs = {};
  if (id) {
    NewsModel.findById({ _id: id }, (err, news) => {
      if (err) {
        rs.message = err.message;
      } else {
        rs.status = 1;
        rs.data = news;
      }

      res.json(rs);
    });
  } else {
    NewsModel.find()
      .sort({ id: 1 })
      .limit(5)
      .exec((err, news) => {
        if (err) {
          rs.message = err.message;
        } else {
          rs.status = 1;
          rs.data = news;
        }
        res.json(rs);
      });
  }
};

module.exports = {
  getLatestNews
};
