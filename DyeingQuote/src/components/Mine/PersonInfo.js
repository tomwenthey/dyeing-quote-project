import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, InputItem, List, WingBlank, WhiteSpace } from "antd-mobile-rn";
import { observer, inject } from "mobx-react";

const PersonInfo = inject("userStore")(
  observer(
    class PersonInfo extends Component {
      constructor(props) {
        super(props);
        this.state = {
          phone: props.userStore.user.phone,
          email: props.userStore.user.email,
          introduce: props.userStore.user.introduce
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

      render() {
        const { user } = this.props.userStore;
        return (
          <View style={{ flex: 1 }}>
            <List renderHeader={() => "完善个人信息"}>
              <InputItem
                clear
                type="phone"
                value={this.state.phone}
                defaultValue={user ? user.phone : null}
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
                defaultValue={user ? user.email : null}
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
                defaultValue={user ? user.introduce : null}
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
