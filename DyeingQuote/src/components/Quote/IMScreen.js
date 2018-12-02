import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Button,
  Platform
} from "react-native";
import { Toast } from "antd-mobile-rn";

import { _storeData, _retrieveData } from "../../util/util";
import { getTuringRobotReply } from "../../util/api";

var RNFS = require("react-native-fs");

import io from "socket.io-client";
const socket = io("http://localhost:4000");

import IMUI from "aurora-imui-react-native";

var InputView = IMUI.ChatInput;
var MessageListView = IMUI.MessageList;
const AuroraIController = IMUI.AuroraIMUIController;
const window = Dimensions.get("window");

var themsgid = 1;

function constructNormalMessage(
  isOutgoing = true,
  msgType = "text",
  date = null
) {
  var message = {};
  message.msgId = themsgid.toString();
  themsgid += 1;
  message.status = "send_succeed";
  message.isOutgoing = isOutgoing;
  message.msgType = msgType;
  let now = new Date();
  date = date || now.toLocaleString();
  message.timeString = date;
  var user = {
    userId: "1",
    displayName: "tom"
  };
  if (Platform.OS === "ios") {
    message.isOutgoing
      ? (user.avatarPath = RNFS.DocumentDirectoryPath + "/avatar.png")
      : (user.avatarPath = RNFS.DocumentDirectoryPath + "/service.png");
  }
  message.fromUser = user;
  return message;
}

var historyMessage = [];

export default class IMScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
    title: navigation.getParam('model', '智能客服'),
    headerStyle: {
      backgroundColor: "#D13F50"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <Button
        onPress={() => {
          navigation.getParam('model') === "人工客服" ? navigation.setParams({model: '智能客服'}) : navigation.setParams({model: '人工客服'})
        }}
        title="切换客服"
        color="#fff"
      />  
    ) 
  }};

  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === "ios") {
      initHeight = 40;
    } else {
      initHeight = 100;
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { width: window.width, height: initHeight },
      isAllowPullToRefresh: true,
      navigationBar: {},
      userId: "",
      serviceId: ""
    };

    _retrieveData("user").then(value => {
      if (value) {
        value = JSON.parse(value);
        this.setState({ userId: value._id, username: value.username }, () => {
          socket.emit("join", 0, this.state.userId);
        });
      } else {
        Toast.fail("请先登录", 1);
      }
    });
    // _storeData("history", JSON.stringify([]));
    _retrieveData("history").then(value => {
      if (value) {
        value = JSON.parse(value);
        historyMessage = value.map(item => {
          if (item.userId === this.state.userId) {
            return item;
          }
        });
      }
    });

    this.updateLayout = this.updateLayout.bind(this);
    this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
  }

  componentDidMount() {
    /**
     * Android only
     * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
     * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
     */
    if (Platform.OS === "android") {
      this.refs["ChatInput"].setMenuContainerHeight(316);
    }
    this.resetMenu();
    AuroraIController.addMessageListDidLoadListener(
      this.messageListDidLoadEvent
    );

    socket.on("assignService", serviceId => {
      if (serviceId) {
        this.setState({ serviceId: serviceId });
      } else {
        Toast.fail("目前暂无空闲客服，请稍后再试。", 1);
      }
    });

    socket.on("msgFromService", (from, to, msg) => {
      this.onSendText(msg, false);
    });
  }

  messageListDidLoadEvent() {
    var message = constructNormalMessage(true, "event");
    message.text = "您好，客服可以为您答疑或者提供报价咨询服务~";
    AuroraIController.appendMessages([message]);
    this.getHistoryMessage();
  }

  getHistoryMessage() {
    var messages = [];
    for (var index in historyMessage) {
      var message = constructNormalMessage(
        historyMessage[index].isOutgoing,
        "text",
        historyMessage[index].date
      );
      message.msgType = "text";
      message.text = historyMessage[index].message;
      messages.push(message);
      AuroraIController.appendMessages([message]);
      AuroraIController.scrollToBottom(true);
    }
  }

  onInputViewSizeChange = size => {
    if (this.state.inputLayoutHeight != size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: window.width, height: size.height },
        messageListLayout: { flex: 1, width: window.width, margin: 0 }
      });
    }
  };

  componentWillUnmount() {
    AuroraIController.removeMessageListDidLoadListener(
      this.messageListDidLoadEvent
    );

    socket.off("assignService");
    socket.off("msgFromService");
  }

  resetMenu() {
    if (Platform.OS === "android") {
      this.refs["ChatInput"].showMenu(false);
      this.setState({
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
        navigationBar: { height: 64, justifyContent: "center" }
      });
      this.forceUpdate();
    } else {
      AuroraIController.hidenFeatureView(true);
    }
  }

  /**
   * Android need this event to invoke onSizeChanged
   */
  onTouchEditText = () => {
    this.refs["ChatInput"].showMenu(false);
  };

  onFullScreen = () => {
    this.setState({
      messageListLayout: { flex: 0, width: 0, height: 0 },
      inputViewLayout: { flex: 1, width: window.width, height: window.height },
      navigationBar: { height: 0 }
    });
  };

  onRecoverScreen = () => {
    // this.setState({
    //   inputLayoutHeight: 100,
    //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
    //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
    //   navigationBar: { height: 64, justifyContent: 'center' }
    // })
  };

  onStatusViewClick = message => {
    message.status = "send_succeed";
    AuroraIController.updateMessage(message);
  };

  onBeginDragMessageList = () => {
    this.resetMenu();
    AuroraIController.hidenFeatureView(true);
  };

  onTouchMsgList = () => {
    AuroraIController.hidenFeatureView(true);
  };

  onSendText = (text, isOutgoing = true) => {
    var message = constructNormalMessage(isOutgoing);
    message.msgType = "text";
    message.text = text;
    const { userId, username, serviceId } = this.state;
    if (isOutgoing) {
      this.props.navigation.getParam('model') === '人工客服' 
      ? socket.emit("userToService", { userId, username }, serviceId, text) 
      : getTuringRobotReply(text)
      .then(res => {res.data.results[0] ? this.onSendText(res.data.results[0].values.text, false) : null})
      .catch(err => Toast.fail(err.message, 1))
    }
    AuroraIController.appendMessages([message]);
    _retrieveData("history").then(value => {
      const date = new Date().toLocaleString();
      if (value) {
        value = JSON.parse(value);
        _storeData(
          "history",
          JSON.stringify(
            value.concat({
              serviceId,
              userId,
              isOutgoing,
              message: text,
              date
            })
          )
        );
      } else {
        _storeData(
          "history",
          JSON.stringify([
            { serviceId, userId, isOutgoing, message: text, date }
          ])
        );
      }
    });
  };

  onTakePicture = media => {
    console.log("media " + JSON.stringify(media));
    var message = constructNormalMessage();
    message.msgType = "image";
    message.mediaPath = media.mediaPath;
    AuroraIController.appendMessages([message]);
    this.resetMenu();
    AuroraIController.scrollToBottom(true);
  };

  onSendGalleryFiles = mediaFiles => {
    /**
     * WARN: This callback will return original image,
     * if insert it directly will high memory usage and blocking UI。
     * You should crop the picture before insert to messageList。
     *
     * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
     * 应该做裁剪操作后再插入到 messageListView 中，
     * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
     *
     * 代码用例不做裁剪操作。
     */
    Alert.alert("fas", JSON.stringify(mediaFiles));
    for (index in mediaFiles) {
      var message = constructNormalMessage();
      if (mediaFiles[index].mediaType == "image") {
        message.msgType = "image";
      } else {
        message.msgType = "video";
        message.duration = mediaFiles[index].duration;
      }

      message.mediaPath = mediaFiles[index].mediaPath;
      message.timeString = "8:00";
      message.status = "send_going";
      AuroraIController.appendMessages([message]);
      AuroraIController.scrollToBottom(true);
    }

    this.resetMenu();
  };

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true);
  };
  onSwitchToGalleryMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onSwitchToCameraMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onShowKeyboard = keyboard_height => {};

  updateLayout(layout) {
    this.setState({ inputViewLayout: layout });
  }

  onInitPress() {
    console.log("on click init push ");
    this.updateAction();
  }

  onClickSelectAlbum = () => {
    console.log("on click select album");
  };

  onCloseCamera = () => {
    console.log("On close camera event");
    this.setState({
      inputLayoutHeight: 100,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { flex: 0, width: window.width, height: 100 },
      navigationBar: { height: 64, justifyContent: "center" }
    });
  };

  /**
   * Switch to record video mode or not
   */
  switchCameraMode = isRecordVideoMode => {
    console.log(
      "Switching camera mode: isRecordVideoMode: " + isRecordVideoMode
    );
    // If record video mode, then set to full screen.
    if (isRecordVideoMode) {
      this.setState({
        messageListLayout: { flex: 0, width: 0, height: 0 },
        inputViewLayout: {
          flex: 1,
          width: window.width,
          height: window.height
        },
        navigationBar: { height: 0 }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MessageListView
          style={this.state.messageListLayout}
          ref="MessageList"
          isAllowPullToRefresh={true}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
          avatarSize={{ width: 48, height: 48 }}
          avatarCornerRadius={24}
          isShowDisplayName={false}
          messageListBackgroundColor={"#f3f3f3"}
          sendBubbleTextSize={16}
          sendBubbleTextColor={"#000000"}
          sendBubblePadding={{ left: 10, top: 10, right: 15, bottom: 10 }}
          datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
          dateBackgroundColor={"#F3F3F3"}
          photoMessageRadius={5}
          maxBubbleWidth={0.7}
          videoDurationTextColor={"#ffffff"}
        />
        <InputView
          style={this.state.inputViewLayout}
          ref="ChatInput"
          onSendText={this.onSendText}
          onTakePicture={this.onTakePicture}
          onSendGalleryFiles={this.onSendGalleryFiles}
          onSwitchToEmojiMode={this.onSwitchToEmojiMode}
          onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode={this.onSwitchToGalleryMode}
          onSwitchToCameraMode={this.onSwitchToCameraMode}
          onShowKeyboard={this.onShowKeyboard}
          onTouchEditText={this.onTouchEditText}
          onFullScreen={this.onFullScreen}
          onRecoverScreen={this.onRecoverScreen}
          onSizeChange={this.onInputViewSizeChange}
          closeCamera={this.onCloseCamera}
          switchCameraMode={this.switchCameraMode}
          showSelectAlbumBtn={true}
          showRecordVideoBtn={false}
          onClickSelectAlbum={this.onClickSelectAlbum}
          inputPadding={{ left: 30, top: 10, right: 10, bottom: 10 }}
          galleryScale={0.6} //default = 0.5
          compressionQuality={0.6}
          customLayoutItems={{
            left: [],
            right: ["send", "emoji"]
            // bottom: ['voice','gallery','emoji','camera']
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendCustomBtn: {},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  inputView: {
    backgroundColor: "green",
    width: window.width,
    height: 100
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#3e83d7",
    borderRadius: 8,
    backgroundColor: "#3e83d7"
  }
});
