import { AsyncStorage } from "react-native";
import { getQuoteResult, createQuote } from "./api";

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

export const handleQuote = (text, fsm, context) => {
  let requirements = { input: text };
  switch (fsm.state) {
    case "s1":
      requirements.type = "specifications";
      getQuoteResult(requirements).then(res => {
        const { status, result, message } = res.data;
        console.log(res.data);
        if (status) {
          fsm.a();
          fsm.requirements.specification = result;
          setTimeout(() => {
            context.onSendText(
              '请输入外观质量执行标准（默认为国标一等，输入"1"表示默认。）',
              false
            );
          }, 1000);
        } else {
          fsm.f();
          setTimeout(() => {
            context.onSendText(message, false);
          }, 1000);
        }
      });
      break;
    case "s2":
      requirements.type = "appearance_quality";
      for (let item in fsm.requirements.appearance_quality) {
        if (fsm.requirements.appearance_quality[item] === "") {
          requirements.inputType = item;
          getQuoteResult(requirements).then(res => {
            const { status, result, message } = res.data;
            if (status) {
              fsm.requirements.appearance_quality[item] = result;
              let { flag, key } = isAnyKeyEmpty(
                fsm.requirements.appearance_quality
              );
              if (!flag) {
                fsm.b();
                setTimeout(() => {
                  context.onSendText(
                    `请输入待报价产品的pH值范围，例：4-10`,
                    false
                  );
                }, 1000);
              } else {
                setTimeout(() => {
                  context.onSendText(
                    `请输入外观质量${key}（默认为一等，输入"1"表示默认）`,
                    false
                  );
                }, 1000);
              }
            } else {
              fsm.g();
              setTimeout(() => {
                context.onSendText(message, false);
              }, 1000);
            }
          });
          break;
        }
      }
      break;
    case "s3":
      requirements.type = "intrinsic_quality";
      for (let item in fsm.requirements.intrinsic_quality) {
        if (fsm.requirements.intrinsic_quality[item] === "") {
          requirements.inputType = item;
          getQuoteResult(requirements).then(res => {
            const { status, result, message } = res.data;
            if (status) {
              fsm.requirements.intrinsic_quality[item] = result;
              let { flag, key } = isAnyKeyEmpty(
                fsm.requirements.intrinsic_quality
              );
              if (!flag) {
                fsm.c();
                setTimeout(() => {
                  context.onSendText(
                    `请输入产品的包装要求，没有特殊要求则输入"无"。`,
                    false
                  );
                }, 1000);
              } else {
                let example;
                switch (key) {
                  case "克重":
                    example = "1.75KGS-1.8KGS/12Y";
                    break;
                  case "织物幅宽":
                    example = "46/47";
                    break;
                  case "（国、日标）耐洗色牢度变色/沾色":
                    example = "3-4级/3-4级";
                    break;
                  case "耐干摩/湿摩色牢度":
                    example = "3-4级/2级";
                    break;
                }
                setTimeout(() => {
                  context.onSendText(
                    `请输入待报价产品的${key}，例：${example}`,
                    false
                  );
                }, 1000);
              }
            } else {
              fsm.h();
              setTimeout(() => {
                context.onSendText(message, false);
              }, 1000);
            }
          });
          break;
        }
      }
      break;
    case "s4":
      fsm.d();
      fsm.requirements.packaging = text;
      setTimeout(() => {
        context.onSendText(`请输入备注信息，没有额外要求则输入"无"。`, false);
      }, 1000);
      break;
    case "s5":
      fsm.e();
      fsm.requirements.remark = text;
      createQuote({
        userId: context.state.userId,
        requirements: fsm.requirements
      }).then(res => {
        if (res.data) {
          setTimeout(() => {
            context.onSendText(res.data.message, false);
          }, 1000);
        }
      });
      context.exitQuote();
      break;
    case "s6":
      context.exitQuote();
      break;
    default:
      break;
  }
};

function isAnyKeyEmpty(obj) {
  let flag = false;
  for (let key in obj) {
    if (obj[key] === "") {
      flag = true;
      return { flag, key };
    }
  }
  return { flag };
}
