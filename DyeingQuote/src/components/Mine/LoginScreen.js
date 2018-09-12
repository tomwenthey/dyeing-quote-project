import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  Button,
  InputItem,
  List,
  WingBlank,
  WhiteSpace,
  Toast
} from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";

import { FETCHING_STATE } from "../../constants";

const LoginScreen = inject("userStore")(
  observer(
    class LoginScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        };
      }

      static navigationOptions = {
        title: "登录",
        headerStyle: {
          backgroundColor: "#D13F50"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };

      handleSubmit = async () => {
        await this.props.userStore.fetch(this.state, "login");
        await this.props.userStore.clearState();
      };

      handleConfirm = () => {
        if (this.state.username && this.state.password) {
          this.handleSubmit();
        } else {
          Toast.fail("用户名或密码不能为空", 1);
        }
      };

      componentDidMount = () => {
        autorun(() => {
          const fetchState = this.props.userStore.fetchState;
          const message = this.props.userStore.alertMessage;
          if (fetchState === FETCHING_STATE.SUCCESS) {
            Toast.success(message, 1);
            this.props.navigation.navigate("Main");
          } else if (message) {
            Toast.fail(message, 1);
            // this.props.userStore.clearState();
          }
        });
      };

      render() {
        const { navigation } = this.props;
        return (
          <View style={styles.loginScreen}>
            <List renderHeader={() => "账号信息"}>
              <InputItem
                clear
                type="text"
                value={this.state.username}
                onChange={value => {
                  this.setState({
                    username: value
                  });
                }}
                placeholder="请输入用户名"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/account.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
              <InputItem
                clear
                type="password"
                value={this.state.password}
                onChange={value => {
                  this.setState({
                    password: value
                  });
                }}
                placeholder="请输入密码"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/password.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
            </List>
            <WingBlank>
              <WhiteSpace size="lg" />
              <Button type="warning" onPressIn={this.handleConfirm}>
                登录
              </Button>
              <WhiteSpace size="lg" />
              <View style={styles.toReg}>
                <Text
                  style={styles.toRegText}
                  onPress={() => navigation.navigate("Reg")}
                >
                  立即注册
                </Text>
              </View>
            </WingBlank>
          </View>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1
  },
  toReg: {
    alignItems: "flex-end"
  },
  toRegText: {
    color: "#777777",
    fontSize: 16
  },
  inputItem: {
    height: 52,
    lineHeight: 48
  }
});

export default LoginScreen;
