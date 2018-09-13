import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { List, WhiteSpace, Toast } from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";

import { FETCHING_STATE } from "../../constants";

const Item = List.Item;

const MineScreen = inject("userStore")(
  observer(
    class MineScreen extends Component {
      componentDidMount = () => {
        autorun(() => {
          const fetchState = this.props.userStore.fetchState;
          const message = this.props.userStore.alertMessage;
          if (fetchState === FETCHING_STATE.SUCCESS && message) {
            Toast.success(message, 1);
            this.props.navigation.navigate("Main");
          } else if (message) {
            Toast.fail(message, 1);
          }
        });
      };

      handleLogout = () => {
        this.props.userStore.logout();
        Toast.success("注销成功", 1);
      };

      render() {
        const { userStore, navigation } = this.props;
        return (
          <View style={styles.mineScreen}>
            {userStore.user ? (
              <View>
                <View style={styles.personInfo}>
                  <Image
                    source={require("./img/avatar.jpg")}
                    style={styles.userAvatar}
                  />
                  <View>
                    <Text style={styles.userName}>
                      {userStore.user.username}
                    </Text>
                    <Text style={styles.introduce}>
                      {userStore.user.introduce
                        ? userStore.user.introduce
                        : "暂无个人简介"}
                    </Text>
                  </View>
                </View>
                <WhiteSpace size="lg" />
                <List>
                  <Item
                    arrow="horizontal"
                    onClick={async () => {
                      await userStore.fetch(null, "get_person_info");
                      await userStore.clearState();
                      navigation.navigate("PersonInfo");
                    }}
                  >
                    个人资料
                  </Item>

                  <Item
                    arrow="horizontal"
                    onClick={() => navigation.navigate("ResetPassword")}
                  >
                    修改密码
                  </Item>
                </List>
                <WhiteSpace size="lg" />
                <List>
                  <Item arrow="horizontal" onClick={this.handleLogout}>
                    退出登录
                  </Item>
                </List>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <View style={styles.toLoginWrapper}>
                  <Image
                    source={require("./img/login.png")}
                    style={styles.toLoginImg}
                  />
                  <Text style={styles.toLogin}>立即登录体验更多功能</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  mineScreen: {
    backgroundColor: "#eeeeee",
    flex: 1
  },
  personInfo: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#ffffff"
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  userName: {
    fontSize: 16
  },
  introduce: {
    color: "#777777",
    fontSize: 14,
    marginTop: 8
  },
  toLoginWrapper: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  toLogin: {
    fontSize: 16,
    color: "#7a7a7a"
  },
  toLoginImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  }
});

export default MineScreen;
