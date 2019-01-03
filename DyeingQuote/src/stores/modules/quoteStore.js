import { observable, action, decorate, flow } from "mobx";

import { FETCHING_STATE } from "../../constants";
import { _storeData } from "../../util/util";

import { getQuotes } from "../../util/api";
class QuoteStore {
  quotes = [];
  fetchState = "";

  fetchQuotes = flow(function*(userId) {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      res = yield getQuotes(userId);
      const { status, data } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        data ? (this.quotes = data) : null;
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
    }
  });
}

decorate(QuoteStore, {
  fetchState: observable,
  quotes: observable
});

export default new QuoteStore();
