import { observable, action, decorate, flow } from "mobx";
import { FETCHING_STATE } from "../../constants";

class NewsStore {
  news = [];
}

decorate(NewsStore, {
  news: observable
});

export default NewsStore;
