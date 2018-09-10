import React from "react";
import { observer, inject } from "mobx-react";
import { TabBar } from "antd-mobile-rn";

import HomeScreen from "./Home/HomeScreen";
import NewsScreen from "./News/NewsScreen";
import QuoteScreen from "./Quote/QuoteScreen";
import MineScreen from "./Mine/MineScreen";

const TabBarNavigation = inject("store")(
  observer(
    class TabBarNavigation extends React.Component {
      render() {
        const { store } = this.props;
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
              <HomeScreen />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/read.png")}
              selectedIcon={require("./img/read-fill.png")}
              title="资讯"
              selected={store.nowTab === 1}
              onPress={() => store.changeTab(1)}
            >
              <NewsScreen />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/YUAN.png")}
              selectedIcon={require("./img/YUAN-circle-fill.png")}
              title="报价"
              selected={store.nowTab === 2}
              onPress={() => store.changeTab(2)}
            >
              <QuoteScreen />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/user.png")}
              selectedIcon={require("./img/user.png")}
              title="My"
              selected={store.nowTab === 3}
              onPress={() => store.changeTab(3)}
            >
              <MineScreen />
            </TabBar.Item>
          </TabBar>
        );
      }
    }
  )
);

export default TabBarNavigation;
