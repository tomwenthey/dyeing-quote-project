import React from "react";
import { observer, inject } from "mobx-react";
import { View, Text } from "react-native";
import { TabBar } from "antd-mobile-rn";

import { TabOneScreenOne } from "./TabOne/views";

const TabBarNavigation = inject("store")(
  observer(
    class TabBarNavigation extends React.Component {
      renderContent(pageText) {
        return (
          <View
            style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
          >
            <Text style={{ margin: 50 }}>{pageText}</Text>
          </View>
        );
      }

      render() {
        const { store } = this.props;
        console.log(this.props);
        return (
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#D13F50"
            barTintColor="#eee"
          >
            <TabBar.Item
              title="首页"
              icon={require("./img/home.png")}
              selectedIcon={require("./img/home-fill.png")}
              selected={store.nowTab === 0}
              onPress={() => store.changeTab(0)}
            >
              <TabOneScreenOne />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/read.png")}
              selectedIcon={require("./img/read-fill.png")}
              title="资讯"
              selected={store.nowTab === 1}
              onPress={() => store.changeTab(1)}
            >
              {this.renderContent("资讯")}
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/YUAN.png")}
              selectedIcon={require("./img/YUAN-circle-fill.png")}
              title="报价"
              selected={store.nowTab === 2}
              onPress={() => store.changeTab(2)}
            >
              {this.renderContent("报价")}
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/user.png")}
              selectedIcon={require("./img/user.png")}
              title="My"
              selected={store.nowTab === 3}
              onPress={() => store.changeTab(3)}
            >
              {this.renderContent("我的")}
            </TabBar.Item>
          </TabBar>
        );
      }
    }
  )
);

export default TabBarNavigation;
