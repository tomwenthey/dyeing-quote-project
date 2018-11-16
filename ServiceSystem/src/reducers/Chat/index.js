/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {
  CHAT_LOGIN,
  SET_SESSION,
  FILTER_SEARCH,
  CHAT_INIT,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  SET_DESTROY,
  SET_LOGOUT
} from "src/constants/Chat";
import Storage from "src/utils/storage";

let _stores = new Storage(),
  Storage_Key = "username";

let initStates = {
  user: {
    name: "客服",
    img: "http://localhost:4000/images/service.jpg"
  },
  sessions: [
    {
      id: 1,
      user: {
        name: "使用帮助",
        img: "http://localhost:4000/images/user.jpg"
      },
      messages: [
        {
          content:
            "华纺智能印染报价客服系统，人工客服可以通过本系统可以与用户进行交流，提供答疑、印染报价等服务。",
          date: Date.now(),
          self: 0
        }
      ]
    }
  ],
  currentChat: {},
  currentUserId: 1,
  id_list: [],
  filterKey: ""
};
let currentChat = {};
let sessions = [];
function chatIndex(state = initStates, action) {
  switch (action.type) {
    case CHAT_LOGIN:
      let id_list = [];
      //   let id_list = action.data.sessions.map(item => {
      //     return item.id;
      //   });
      //   // console.log("SEARCH_RESULT = 17",initStates);
      //   action.data.sessions.unshift(initStates.sessions[0]);

      return Object.assign({}, state, {
        user: action.data.user,
        sessions: [initStates.sessions[0]],
        id_list,
        currentUserId: 1,
        currentChat: initStates.sessions[0]
      });

    case CHAT_INIT:
      var _store = JSON.parse(localStorage.getItem("_store") || "{}");
      if (!_stores.get(Storage_Key)) {
        localStorage.clear();
        return Object.assign({}, state, { ...initStates, sessions: [] });
      }
      if (_store && _store.chatIndex) {
        let { sessions, currentUserId, user, id_list } = _store.chatIndex;
        currentChat =
          sessions.filter(item => item.id == currentUserId)[0] || {};
        // return Object.assign({},state,{sessions,currentUserId,user,id_list,currentChat:currentChat,filterKey:""});
      }
      return Object.assign({}, state, _store.chatIndex || {}, {
        currentChat: currentChat,
        filterKey: ""
      });

    //搜索
    case FILTER_SEARCH:
      return Object.assign({}, state, {
        filterKey: action.data
      });

    case SET_SESSION:
      sessions = state.sessions.map(item => {
        if (item.id == action.data) {
          item.status = false;
          currentChat = item;
        }
        return item;
      });
      return Object.assign({}, state, {
        sessions,
        currentChat,
        currentUserId: action.data
      });

    case SEND_MESSAGE: //发送消息
      // console.log("SEND_MESSAGE",action.data);

      sessions = state.sessions.map(item => {
        if (item.id == state.currentUserId) {
          item.messages = item.messages.concat(action.data);
          currentChat = item;
        }
        return item;
      });
      // (sessions.filter((item)=>item.id==state.currentUserId)[0])
      return Object.assign({}, state, {
        sessions: sessions,
        currentChat: currentChat
      });
    //接收消息
    case RECEIVE_MESSAGE:
      // console.log("SEND_MESSAGE",action.data);
      if (action.data.length <= 0) {
        return state;
      }
      for (let key in action.data) {
        console.log(action.data[key]);
        let { id } = action.data[key];
        sessions = state.sessions.map(item => {
          if (item.id == id && item.id != state.currentUserId) {
            item.status = true;
            item.messages = item.messages.concat(action.data[key].messages);
          }
          if (item.id == state.currentUserId) {
            currentChat = item;
          }
          return item;
        });
      }
      // (sessions.filter((item)=>item.id==state.currentUserId)[0])
      return Object.assign({}, state, {
        sessions: sessions,
        currentChat: currentChat
      });
    //	送客
    case SET_DESTROY:
      let _sessions = state.sessions.filter(
        item => item.id !== state.currentUserId
      );
      // (sessions.filter((item)=>item.id==state.currentUserId)[0])
      return Object.assign({}, state, {
        sessions: _sessions,
        currentChat: _sessions[0],
        currentUserId: _sessions[0].id
      });
    //退出
    case SET_LOGOUT:
      localStorage.clear();
      return Object.assign({}, state, {
        currentChat: 1,
        user: {},
        sessions: [],
        filterKey: ""
      });
    default:
      return state;
  }
}

export default chatIndex;
