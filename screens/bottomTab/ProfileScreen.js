import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import { userSelector } from '../../store/selector';
import { obfuscatePhoneNumber } from '../../util/util';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { removeUser } from '../../store/features/authSlice';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const handleLogout = async () => {
    await signOut(auth)
    await AsyncStorage.removeItem('accessToken')
      .then(dispatch(removeUser()))
  }

  const convertPhoneNumber = (phoneNumber) => {
    let convertedNumber = phoneNumber.replace(/[^\d]/g, '');
    if (phoneNumber.startsWith('+')) {
      convertedNumber = '0' + convertedNumber.slice(2);
    }
    return convertedNumber
  }

  const optionList = [
    {
      name: "Danh sách bé",
      icon: <Icon name={"account-group"} color={"black"} size={30} />,
      role: ["PARENT"],
      onClick: () => navigation.push("StudentListScreen"),
    },
    {
      name: "Khóa học đăng ký",
      icon: <Icon name={"file-document"} color={"black"} size={30} />,
      role: ["PARENT"],
      onClick: () => console.log("comming soon"),
    },
    {
      name: "Khóa học quan tâm",
      icon: <Icon name={"file-star"} color={"black"} size={30} />,
      role: ["PARENT"],
      onClick: () => console.log("comming soon"),
    },
    {
      name: "Ví điện tử",
      icon: <Icon name={"wallet"} color={"black"} size={30} />,
      role: ["PARENT"],
      onClick: () => console.log("comming soon"),
    },
    {
      name: "Lịch sử giao dịch",
      icon: <Icon name={"timer-sand-full"} color={"black"} size={30} />,
      role: ["PARENT"],
      onClick: () => navigation.push("TransactionHistoryScreen"),
    },
    {
      name: "Đăng xuất",
      icon: <Icon name={"logout"} color={"black"} size={30} />,
      role: ["PARENT", "LECTURER", "STUDENT"],
      onClick: handleLogout,
    },
  ]

  return (
    <>
      <Header navigation={navigation} title={"Tài khoản"} goback={navigation.goBack} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.userDetail} onPress={() => navigation.navigate("AccountSettingScreen")}>
          <View style={{ ...styles.flexColumnBetween, alignItems: "center", paddingRight: 8 }}>
            <View>
              <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                <Text style={styles.userName}>
                  {
                    user?.role?.name?.name === "LECTURER" ?
                      "GV: "
                      :
                      "PH: "
                  }
                  {user.fullName}</Text>
              </View>
              <Text >Sđt: {obfuscatePhoneNumber(convertPhoneNumber(user.phone))}</Text>
            </View>
            <Icon name={"chevron-right"} color={"black"} size={30} />
          </View>
        </TouchableOpacity>
        <View style={styles.userOption}>
          <Text style={styles.boldText}>Tài khoản:</Text>
          {
            optionList.map((item, index) => {
              return (
                (item.role.includes(user?.role?.name)) &&
                < TouchableOpacity
                  style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#D9D9D9" }}
                  onPress={item.onClick}
                  key={index}
                >
                  <View style={styles.flexColumn}>
                    {item.icon}
                    <Text style={{ ...styles.boldText, marginHorizontal: 10 }}>
                      {item.name}
                    </Text>
                  </View>
                  <Icon name={"chevron-right"} color={"black"} size={30} />
                </TouchableOpacity>
              )

            })
          }


        </View>

      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userDetail: {
    width: WIDTH * 0.95,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#241468",
    marginHorizontal: WIDTH * 0.025,
    marginVertical: 20,
  },
  userName: {
    fontWeight: "900",
    color: "#241468",
    fontSize: 18
  },
  userOption: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    // marginVertical: 20,
  },

  flexColumnAround: {
    width: WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  flexColumnCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumnBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "600",
  },
})