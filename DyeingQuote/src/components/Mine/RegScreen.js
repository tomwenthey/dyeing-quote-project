import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, InputItem, List, WhiteSpace, WingBlank } from "antd-mobile-rn";

class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      introduce: ""
    };
  }

  static navigationOptions = {
    title: "注册",
    headerStyle: {
      backgroundColor: "#D13F50"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.regScreen}>
        <List renderHeader={() => "注册账号"}>
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
            style={{ backgroundColor: "#FFF" }}
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
        <List renderHeader={() => "个人信息"}>
          <InputItem
            clear
            type="text"
            value={this.state.password}
            onChange={value => {
              this.setState({
                email: value
              });
            }}
            placeholder="请输入邮箱"
            labelNumber={2}
          >
            <Image
              source={require("./img/email.png")}
              style={{ height: 25, width: 25 }}
            />
          </InputItem>
          <InputItem
            clear
            type="phone"
            value={this.state.password}
            onChange={value => {
              this.setState({
                phone: value
              });
            }}
            placeholder="请输入手机号"
            labelNumber={2}
          >
            <Image
              source={require("./img/phone.png")}
              style={{ height: 25, width: 25 }}
            />
          </InputItem>
          <InputItem
            clear
            type="text"
            value={this.state.password}
            onChange={value => {
              this.setState({
                introduce: value
              });
            }}
            placeholder="个人简介"
            labelNumber={2}
          >
            <Image
              source={require("./img/introduce.png")}
              style={{ height: 25, width: 25 }}
            />
          </InputItem>
        </List>
        <WingBlank>
          <WhiteSpace size="lg" />
          <Button type="warning">注册</Button>
          <WhiteSpace size="lg" />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.toLogin}>
              <Text style={styles.toLoginText}>已有账号，去登录</Text>
            </View>
          </TouchableOpacity>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regScreen: {
    flex: 1
  },
  toLogin: {
    alignItems: "flex-end"
  },
  toLoginText: {
    color: "#777777",
    fontSize: 16
  }
});

export default RegScreen;
