import { observable, action, decorate, flow } from "mobx";
import { FETCHING_STATE } from "../../constants";

class NewsStore {
  news = [];

  nowArticle = {
    title: "",
    content: "",
    type: "",
    time: ""
  };
}

decorate(NewsStore, {
  news: observable,
  nowArticle: observable
});

export default NewsStore;
