/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "mobx-react";
import { createStackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import TabBar from "./components/TabBarNavigation";
import LoginScreen from "./components/Mine/LoginScreen";
import RegScreen from "./components/Mine/RegScreen";
import ChangePassword from "./components/Mine/ChangePassword";
import stores from "./stores";

const Navigator = createStackNavigator(
  {
    Main: { screen: TabBar },
    Login: { screen: LoginScreen },
    Reg: { screen: RegScreen },
    ChangePassword: { screen: ChangePassword }
  },

  {
    navigationOptions: {
      // 开启动画
      animationEnabled: true,
      // 开启边缘触摸返回
      gesturesEnabled: true
    }
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Navigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
