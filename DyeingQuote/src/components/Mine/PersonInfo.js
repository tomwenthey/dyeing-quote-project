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

const PersonInfo = inject("userStore")(
  observer(
    class PersonInfo extends Component {
      constructor(props) {
        super(props);
        this.state = {
          phone: "",
          email: "",
          introduce: ""
        };
      }

      static navigationOptions = {
        title: "个人资料",
        headerStyle: {
          backgroundColor: "#D13F50"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };

      handleSubmit = async () => {
        await this.props.userStore.fetch(this.state, "person_info");
        await this.props.userStore.clearState();
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
            <List renderHeader={() => "完善个人信息"}>
              <InputItem
                clear
                type="phone"
                value={this.state.phone}
                onChange={value => {
                  this.setState({
                    phone: value
                  });
                }}
                placeholder="请输入手机号"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/phone.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
              <InputItem
                clear
                type="text"
                value={this.state.email}
                onChange={value => {
                  this.setState({
                    email: value
                  });
                }}
                placeholder="请输入邮箱"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/email.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
              <InputItem
                clear
                type="text"
                value={this.state.introduce}
                onChange={value => {
                  this.setState({
                    introduce: value
                  });
                }}
                placeholder="个人简介"
                labelNumber={2}
                style={styles.inputItem}
              >
                <Image
                  source={require("./img/introduce.png")}
                  style={{ height: 25, width: 25 }}
                />
              </InputItem>
            </List>
            <WingBlank>
              <WhiteSpace size="lg" />
              <Button type="warning" onPressIn={this.handleSubmit}>
                提交
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

export default PersonInfo;
