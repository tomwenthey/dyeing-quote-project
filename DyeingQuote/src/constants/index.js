export const TITLE = ["首页", "资讯", "报价", "我的"];

export const FETCHING_STATE = {
  PENDING: "pending",
  DONE: "done",
  ERROR: "error",
  SUCCESS: "success"
};

// the base uri for request
export const BASE = "http://localhost:4000/";

// all user api in one place
export const userApi = {
  user: "user/",
  users: "users/",
  login: "users/login/",
  resetPassword: "users/password_reset/"
};

export const newsApi = {
  articles: "articles/",
  article: "article/",
  news: "news/"
};
