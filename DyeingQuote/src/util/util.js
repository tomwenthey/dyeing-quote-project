import { AsyncStorage } from "react-native";

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error.message);
  }
};

export const _retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const _removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};

export const _iso8601_to_standard_date = (
  iso8601_str //默认这个字符串是0时区
) => {
  var standard_date = "";
  standard_date = iso8601_str.replace("T", " ").replace(".000Z", "");

  var date = "";
  var time = "";

  var str = "";
  var myDate = new Date(standard_date);
  myDate.setHours(myDate.getHours() + 8);

  // 得到日期
  str = myDate.getFullYear();
  str = str + "/" + ol_pad(myDate.getMonth() + 1, 2);
  str = str + "/" + ol_pad(myDate.getDate(), 2);
  date = str;

  // 得到时间
  str = ol_pad(myDate.getHours(), 2);
  str = str + ":" + ol_pad(myDate.getMinutes(), 2);
  time = str;

  return date + " " + time;
};

// 补齐指定长度补零
function ol_pad(num, n) {
  num = "" + num;
  var temp = num;

  for (var i = 0; i < n - num.length; i++) {
    temp = "0" + temp;
  }
  return temp;
}
