import { observable, action, decorate, flow, ObservableMap } from "mobx";

import { FETCHING_STATE } from "../../constants";
import { userLogin } from "../../util/api";

class UserStore {
  loginState = "";
  loginSuccess = false;
  regState = "";
  alertMessage = "";
  user = null;

  fetchLogin = flow(function*(user) {
    this.loginState = FETCHING_STATE.PENDING;
    try {
      const res = yield userLogin(user);
      const { message, status } = res.data;
      this.loginState = FETCHING_STATE.DONE;
      if (status) {
        this.user = res.data.user;
        this.loginSuccess = true;
      }
      this.alertMessage = message;
    } catch (error) {
      this.loginState = FETCHING_STATE.ERROR;
      this.alertMessage = error.message;
    }
  });
}

decorate(UserStore, {
  loginState: observable,
  loginSuccess: observable,
  regState: observable,
  username: observable,
  alertMessage: observable
});

export default new UserStore();
