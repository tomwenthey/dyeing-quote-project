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

export const turingApi = "http://openapi.tuling123.com/openapi/api/v2";
const turingtoken = "fa239baccb0c4107808c4bd0a1dccbd8";
const turinguserid = "359345";

export const turingApiCreater = text => {
  return {
    reqType: 0,
    perception: {
      inputText: {
        text: text
      }
    },
    userInfo: {
      apiKey: turingtoken,
      userId: turinguserid
    }
  };
};

export const FSM_DEFINE = {
  init: "s1",
  transitions: [
    { name: "a", from: "s1", to: "s2" },
    { name: "b", from: "s2", to: "s3" },
    { name: "c", from: "s3", to: "s4" },
    { name: "d", from: "s4", to: "s5" },
    { name: "e", from: "s5", to: "s6" },
    { name: "f", from: "s1", to: "s1" },
    { name: "g", from: "s2", to: "s2" },
    { name: "h", from: "s3", to: "s3" }
  ],
  data: {
    requirements: {
      specification: "",
      appearance_quality: {
        执行标准: "",
        质量要求: ""
      },
      intrinsic_quality: {
        pH值: "",
        克重: "",
        织物幅宽: "",
        "（国、日标）耐洗色牢度变色/沾色": "",
        "耐干摩/湿摩色牢度": ""
      },
      packaging: "",
      remark: ""
    },
    lastState: ""
  },
  methods: {
    onTransition: function(lifecycle, arg1) {
      console.log(lifecycle.transition);
      console.log(lifecycle.from);
      console.log(lifecycle.to);
      console.log(this.requirements);
    }
  }
};
