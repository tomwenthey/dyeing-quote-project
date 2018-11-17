/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import { ajaxJson } from "src/utils/ajax";
import { fetchJson } from "src/utils/fetch";
import Storage from "src/utils/storage";
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

let _store = new Storage(),
  Storage_Key = "username";

let chat = {
  chat_init: data => {
    return {
      type: CHAT_INIT,
      data
    };
  },
  chatLogin: options => {
    return dispatch => {
      const { data, socket, success, error } = options;
      /*ajaxJson({
				type:"POST",
				url:"/initSession",
				data:data,
				success:(req)=>{
					console.log(req)
					if(req.res == 10000){
						let {data}= req;
						dispatch({
							type:CHAT_LOGIN,
							data
						});
					}else{
						console.log(req.errorMsg)
					};
					success&&success(req);
				},error:()=>{
					error&&error();
				}
			});
			return ;*/
      fetchJson({
        type: "POST",
        url: "/service/login",
        data: data,
        success: req => {
          if (req.status == 1) {
            _store.set(Storage_Key, data.username, 120);
            dispatch({
              type: CHAT_LOGIN,
              data: req,
              socket
            });
          }
        },
        error: err => {
          error && error(err);
        }
      });
    };
  },
  filter_search: data => {
    return {
      type: FILTER_SEARCH,
      data
    };
  },
  set_session: data => {
    return {
      type: SET_SESSION,
      data
    };
  },
  send_message: options => {
    return dispatch => {
      const { user, userId, id, content, socket, success, error } = options;
      socket.emit("serviceToUser", user.sid, userId, content);
      dispatch({
        type: SEND_MESSAGE,
        data: [
          {
            content: content,
            date: Date.now(),
            self: 1
          }
        ]
      });
      success && success();
      // fetchJson({
      //   type: "POST",
      //   url: "/pushMessage?sid=" + user.sid,
      //   data: {
      //     sid: user.sid,
      //     id: id,
      //     content: content
      //   },
      //   success: req => {
      //     if (req.res == 10000) {
      //       let { data } = req;

      //       data.unshift({
      //         content: content,
      //         date: Date.now(),
      //         self: 1
      //       });
      //       dispatch({
      //         type: SEND_MESSAGE,
      //         data
      //       });
      //     } else {
      //       console.log(req.errorMsg);
      //     }
      //     success && success(req);
      //   },
      //   error: () => {
      //     error && error();
      //   }
      // });
    };
  },
  //接收消息
  receive_message: data => {
    return {
      type: RECEIVE_MESSAGE,
      data
    };
    // return dispatch => {

    // const { user, id_list, success, error } = options;
    // fetchJson({
    //   type: "POST",
    //   url: "/getMessage?sid=" + user.sid,
    //   data: {
    //     id_list: id_list
    //   },
    //   success: req => {
    //     if (req.res == 10000) {
    //       let { data } = req;
    //       dispatch({
    //         type: RECEIVE_MESSAGE,
    //         data
    //       });
    //     } else {
    //       console.log(req.errorMsg);
    //     }
    //     success && success(req);
    //   },
    //   error: () => {
    //     error && error();
    //   }
    // });
    // };
  },
  //送客
  set_destroy: options => {
    return dispatch => {
      const { user, id, success, error } = options;
      ajaxJson({
        type: "GET",
        url: "/destroySession?sid=" + user.sid + "&openid=" + id,
        success: req => {
          if (req.res == 10000) {
            let { data } = req;
            dispatch({
              type: SET_DESTROY,
              data: content
            });
          } else {
            console.log(req.errorMsg);
          }
          success && success(req);
        },
        error: () => {
          error && error();
        }
      });
    };
  },
  set_logout: data => {
    return {
      type: SET_LOGOUT,
      data
    };
  }
};
export default chat;
