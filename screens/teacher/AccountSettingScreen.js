import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FavoriteHeader from '../../components/header/FavoriteHeader';
import { userSelector } from '../../store/selector';
import { useSelector } from 'react-redux';
import { obfuscateEmail, obfuscatePhoneNumber } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function AccountSettingScreen({ navigation }) {

    const user = useSelector(userSelector);
    const [userData, setUserData] = useState({
        name: user.fullName,
        email: user.email,
        phoneNumber: user.phone,
        district: user.address
    })
    const [userEdit, setUserEdit] = useState({
        name: user.fullName,
        email: user.email,
        phoneNumber: user.phone,
        district: user.address
    })
    const [screenStatus, setScreenStatus] = useState({ edit: false })

    const hanldeChangeStatus = () => {
        if (screenStatus.edit) {
            setScreenStatus({ edit: false })
        } else {
            setScreenStatus({ edit: true })
        }
    }

    const convertPhoneNumber = (phoneNumber) => {
        let convertedNumber = phoneNumber.replace(/[^\d]/g, '');
        if (phoneNumber.startsWith('+')) {
            convertedNumber = '0' + convertedNumber.slice(2);
        }
        return convertedNumber
    }

    return (
        <>
            <FavoriteHeader
                navigation={navigation}
                title={`Thông tin cá nhân`}
                type={screenStatus.edit}
                setType={hanldeChangeStatus}
                defaultType={"Huỷ"}
                editType={"Cập Nhật"}
            // goback={navigation.goBack}
            />
            <View style={styles.container}>
                <View style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#E5E5E5" }}>
                    <Text style={styles.boldText}>Tên</Text>
                    <Text style={[styles.boldText, styles.valueText]}>{userData.name}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#E5E5E5" }}>
                    <Text style={styles.boldText}>Email</Text>
                    <TextInput
                        value={!screenStatus.edit ? obfuscateEmail(userData.email) : userEdit.email}
                        onChangeText={(text) => !screenStatus.edit ? setUserData({ ...userData, email: text }) : setUserEdit({ ...userEdit, email: text })}
                        style={[styles.valueText]}
                        placeholder={userData.email ? userData.email : "Cập nhật email"}
                        placeholderTextColor="#C2C2C2"
                        editable={screenStatus.edit}
                    />
                </View>
                <View style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#E5E5E5" }}>
                    <Text style={styles.boldText}>Số Điện Thoại</Text>
                    <Text style={[styles.valueText]}>{obfuscatePhoneNumber(convertPhoneNumber(userData.phoneNumber))}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#E5E5E5" }}>
                    <Text style={styles.boldText}>Địa chỉ</Text>
                    <Text style={[styles.valueText]}>{userData.district}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        ...styles.flexColumnBetween,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderColor: "#E5E5E5"
                    }}
                    onPress={() => navigation.push("ChangeApiLinkScreen")}
                >

                    <View style={styles.flexColumn}>
                        <Icon name={"link-variant"} color={"black"} size={30} />
                        <Text style={{ ...styles.boldText, marginHorizontal: 10 }}>
                            Đường dẫn
                        </Text>
                    </View>
                    <Icon name={"chevron-right"} color={"black"} size={30} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: 'white',
        paddingHorizontal: WIDTH * 0.03,
        paddingTop: 20,
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
        fontWeight: "700",
    },

    valueText: {
        color: "#757575"
    },
});