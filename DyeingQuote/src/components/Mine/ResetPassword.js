import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
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

const ResetPassword = inject("userStore")(
  observer(
    class ResetPassword extends Component {
      constructor(props) {
        super(props);
        this.state = {
          oldPassword: "",
          newPassword: ""
        };
      }

      static navigationOptions = {
        title: "修改密码",
        headerStyle: {
          backgroundColor: "#D13F50"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };

      handleSubmit = async () => {
        await this.props.userStore.fetch(this.state, "password_reset");
        await this.props.userStore.clearState();
      };

      handleConfirm = () => {
        if (this.state.oldPassword === this.state.newPassword) {
          Toast.fail("新密码与原密码不能相同", 1);
        } else if (!this.state.oldPassword || !this.state.newPassword) {
          Toast.fail("原密码或新密码不能为空", 1);
        } else {
          this.handleSubmit();
        }
      };

      componentDidMount = () => {
        autorun(() => {
          if (this.props.userStore.fetchState === FETCHING_STATE.DONE) {
            if (this.props.userStore.fetchSuccess) {
              Toast.success(this.props.userStore.alertMessage, 1);
              this.props.navigation.navigate("Main");
            } else if (this.props.userStore.alertMessage) {
              Toast.fail(this.props.userStore.alertMessage, 1);
            }
          } else if (this.props.userStore.loginState === FETCHING_STATE.ERROR) {
            Toast.fail(this.props.userStore.alertMessage, 1);
          }
        });
      };

      render() {
        return (
          <View style={{ flex: 1 }}>
            <List renderHeader={() => "修改密码"}>
              <InputItem
                clear
                type="password"
                value={this.state.oldPassword}
                onChange={value => {
                  this.setState({
                    oldPassword: value
                  });
                }}
                placeholder="请输入原密码"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/password.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
              <InputItem
                clear
                type="password"
                value={this.state.newPassword}
                onChange={value => {
                  this.setState({
                    newPassword: value
                  });
                }}
                placeholder="请输入新密码"
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
                确认修改
              </Button>
            </WingBlank>
          </View>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  inputItem: {
    height: 52,
    lineHeight: 48
  }
});

export default ResetPassword;
