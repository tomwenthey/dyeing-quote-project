import { observable, action, decorate, flow } from "mobx";

import { FETCHING_STATE } from "../../constants";
import { userLogin, createUser } from "../../util/api";

class UserStore {
  fetchState = "";
  alertMessage = "";
  user = null;

  clearState() {
    this.fetchState = "";
    this.alertMessage = "";
  }

  logout() {
    this.clearState();
    // AsyncStorage 中清除user信息
    console.log("注销");
  }

  fetch = flow(function*(data, type) {
    this.clearState();
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      switch (type) {
        case "login":
          res = yield userLogin(data);
          break;
        case "reg":
          res = yield createUser(data);
          break;
      }
      const { message, status, user } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        user ? (this.user = user) : null;
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
      this.alertMessage = message;
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
      this.alertMessage = error.message;
    }
  });
}

decorate(UserStore, {
  fetchState: observable,
  user: observable,
  alertMessage: observable,
  clearLoginState: action,
  logout: action
});

export default new UserStore();
