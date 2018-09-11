import axios from "axios";

// the base uri for request
export const base = "http://localhost:4000";

// all user api in one place
export const userApi = {
  login: "/users/login/"
};

export function userLogin(user) {
  return axios.post(base + userApi.login, user);
}
