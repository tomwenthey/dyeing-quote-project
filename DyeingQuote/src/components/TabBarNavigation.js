import React from "react";
import { observer, inject } from "mobx-react";
import { TabBar, Button } from "antd-mobile-rn";

import HomeScreen from "./Home/HomeScreen";
import NewsScreen from "./News/NewsScreen";
import QuoteScreen from "./Quote/QuoteScreen";
import MineScreen from "./Mine/MineScreen";
import { _retrieveData } from "../util/util";

const TabBarNavigation = inject("globalStore", "userStore")(
  observer(
    class TabBarNavigation extends React.Component {
      static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam("title", "首页"),
          headerStyle: {
            backgroundColor: "#D13F50"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      };

      componentDidMount() {
        _retrieveData("user").then(value => {
          if (value) {
            this.props.userStore.setUser(JSON.parse(value));
          } else {
            this.setState({ user: null });
          }
        });
      }

      render() {
        const { globalStore, navigation } = this.props;

        return (
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#D13F50"
            unselectedTintColor="#777"
          >
            <TabBar.Item
              title="首页"
              icon={require("./img/home.png")}
              selectedIcon={require("./img/home-fill.png")}
              selected={globalStore.nowTab === 0}
              onPress={() => {
                globalStore.changeTab(0);
                navigation.setParams({ title: "首页" });
              }}
            >
              <HomeScreen navigation={navigation} />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/read.png")}
              selectedIcon={require("./img/read-fill.png")}
              title="资讯"
              selected={globalStore.nowTab === 1}
              onPress={() => {
                globalStore.changeTab(1);
                navigation.setParams({ title: "资讯" });
              }}
            >
              <NewsScreen navigation={navigation} />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/YUAN.png")}
              selectedIcon={require("./img/YUAN-fill.png")}
              title="报价"
              selected={globalStore.nowTab === 2}
              onPress={() => {
                globalStore.changeTab(2);
                navigation.setParams({ title: "报价" });
              }}
            >
              <QuoteScreen navigation={navigation} />
            </TabBar.Item>
            <TabBar.Item
              icon={require("./img/user.png")}
              selectedIcon={require("./img/user-fill.png")}
              title="我的"
              selected={globalStore.nowTab === 3}
              onPress={() => {
                globalStore.changeTab(3);
                navigation.setParams({ title: "我的" });
              }}
            >
              <MineScreen navigation={navigation} />
            </TabBar.Item>
          </TabBar>
        );
      }
    }
  )
);

export default TabBarNavigation;
