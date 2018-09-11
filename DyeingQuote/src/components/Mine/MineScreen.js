import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { observer, inject } from "mobx-react";

const MineScreen = inject("userStore")(
  observer(
    class MineScreen extends Component {
      render() {
        const { userStore, navigation } = this.props;
        return (
          <View style={styles.mineScreen}>
            {userStore.loginSuccess ? (
              <View style={styles.personInfo}>
                <Image
                  source={require("./img/avatar.jpg")}
                  style={styles.userAvatar}
                />
                <View>
                  <Text style={styles.userName}>{userStore.user.username}</Text>
                  <Text style={styles.introduce}>
                    {userStore.user.introduce
                      ? userStore.user.introduce
                      : "暂无个人简介"}
                  </Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <View style={styles.toLoginWrapper}>
                  <Image
                    source={require("./img/login.png")}
                    style={styles.toLoginImg}
                  />
                  <Text style={styles.toLogin}>立即登录体验更多功能</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  mineScreen: {
    backgroundColor: "#eeeeee",
    flex: 1
  },
  personInfo: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#ffffff"
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  userName: {
    fontSize: 16
  },
  introduce: {
    color: "#777777",
    fontSize: 14,
    marginTop: 8
  },
  toLoginWrapper: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  toLogin: {
    fontSize: 16,
    color: "#7a7a7a"
  },
  toLoginImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  }
});

export default MineScreen;
