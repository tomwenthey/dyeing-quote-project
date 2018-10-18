const ArticleModel = require("../models/articles");

const getArticle = (req, res) => {
  const { id } = req.params;
  let rs = { status: 0 };

  ArticleModel.findById({ _id: id }, (err, article) => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      rs.data = article;
    }

    res.json(rs);
  });
};

const getArticles = (req, res) => {
  let rs = { status: 0 };
  ArticleModel.find().exec((err, articles) => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      articles.sort(function randomSort(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
      });
      rs.data = articles;
    }

    res.json(rs);
  });
};

module.exports = {
  getArticle,
  getArticles
};
