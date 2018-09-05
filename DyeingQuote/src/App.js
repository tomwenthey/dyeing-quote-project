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

import TabBar from "./components/TabBarNavigation";
import Header from "./components/common/Header";
import Store from "./store";

export default class App extends Component {
  render() {
    const store = new Store();
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header style={styles.header} />
          <TabBar />
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
