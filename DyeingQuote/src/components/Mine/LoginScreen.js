import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, InputItem, List, WingBlank, WhiteSpace } from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";

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

      handleSubmit = () => {
        this.props.userStore.fetchLogin(this.state);
      };

      handleConfirm = () => {
        this.handleSubmit();
      };

      componentDidMount = () => {
        autorun(() => {
          if (this.props.userStore.loginSuccess) {
            this.props.navigation.navigate("Main");
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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Reg")}
              >
                <View style={styles.toReg}>
                  <Text style={styles.toRegText}>立即注册</Text>
                </View>
              </TouchableOpacity>
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
  }
});

export default LoginScreen;
