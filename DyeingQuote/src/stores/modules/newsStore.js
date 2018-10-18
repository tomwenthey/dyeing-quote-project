import { observable, action, decorate, flow } from "mobx";

import { FETCHING_STATE } from "../../constants";
import { _storeData } from "../../util/util";

import {
  getArticles,
  getArticle,
  getLatestNews,
  getNowLatestNews
} from "../../util/api";
class NewsStore {
  articles = [];
  fetchState = "";
  nowArticle = {};
  latestNews = [];
  nowNews = {};

  changeNowArticle(_id) {
    this.nowArticle._id = _id;
  }

  changeNowLatestNews(_id) {
    this.nowNews._id = _id;
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

  fetchLatestNews = flow(function*() {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      res = yield getLatestNews();
      const { status, data } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        data ? (this.latestNews = data) : null;
        _storeData("news", JSON.stringify(data));
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
    }
  });

  fetchNowLatestNews = flow(function*(id) {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      res = yield getNowLatestNews(id);
      const { status, data } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        data ? (this.nowNews = data) : null;
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
  latestNews: observable,
  nowNews: observable,
  changeNowArticle: action,
  changeNowLatestNews: action
});

export default new NewsStore();
