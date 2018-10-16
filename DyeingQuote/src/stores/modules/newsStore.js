import { observable, action, decorate, flow } from "mobx";
import { FETCHING_STATE } from "../../constants";

import { getArticles, getArticle } from "../../util/api";
class NewsStore {
  articles = [];
  fetchState = "";
  nowArticle = {};

  changeNowArticle(_id) {
    this.nowArticle._id = _id;
  }

  fetchArticle = flow(function*(id) {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      res = yield getArticle(id);
      const { status, data } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        data ? (this.nowArticle = data) : null;
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
    }
  });

  fetchArticles = flow(function*() {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      res = yield getArticles();
      const { status, data } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        data ? (this.articles = data) : null;
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
    }
  });
}

decorate(NewsStore, {
  fetchState: observable,
  news: observable,
  nowArticle: observable,
  changeNowArticle: action
});

export default new NewsStore();
