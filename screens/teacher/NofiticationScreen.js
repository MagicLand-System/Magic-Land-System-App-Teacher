import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header'
import { readNotification } from '../../api/notification';
import { formatDate } from '../../util/util';
import { NotificateContext } from '../../context/NotificateContext';
import CustomToast from "../../components/CustomToast";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function NofiticationScreen({ route, navigation }) {

    const { notificate, updateNotificate, reloadNotificate } = useContext(NotificateContext)
    const [nofiticationList, setNofiticationList] = useState([])
    const showToast = CustomToast();

    useEffect(() => {
        setNofiticationList(notificate?.reverse())
    }, [notificate])

    const handleOnPress = async (item) => {
        const response = await readNotification([item?.notificationId])
        if (response?.status === 200) {
            const updateList = nofiticationList?.map((element) => {
                if (element?.notificationId === item?.notificationId) {
                    return { ...element, isRead: true }
                } else {
                    return { ...element }
                }
            })
            updateNotificate(updateList)
            setNofiticationList(updateList?.reverse())
        } else {
            console.log(response?.response?.data);
        }
    }

    const handleSetAllRead = async () => {
        const IdList = nofiticationList?.filter((element) => element?.isRead === false)
            .map((element) => element?.notificationId);
        if (!Array.isArray(IdList)) {
            // showToast("Thông báo", `Tất cả thông báo đã được đọc`, "success");
        } else {
            const response = await readNotification(IdList)
            if (response?.status === 200) {
                await reloadNotificate()
                showToast("Thông báo", `Tất cả thông báo đã đọc`, "success");
            } else {
                console.log(response?.response?.data);
            }
        }
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Thông báo"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.nofiticationList}>
                <View style={styles.allReadView}>
                    <TouchableOpacity style={styles.allReadButton} onPress={handleSetAllRead}>
                        <Icon name={"text-box-check-outline"} color={"#241468"} size={28} />
                    </TouchableOpacity>
                </View>
                {
                    nofiticationList?.map((item, key) => {
                        return (
                            <TouchableOpacity
                                style={{ ...styles.nofiticationTab, backgroundColor: !item?.isRead ? "white" : "#EBEBEB" }}
                                onPress={() => { handleOnPress(item) }}
                                key={key}
                            >
                                <View style={{ ...styles.flexColumnBetween, marginVertical: 5 }}>
                                    <Text style={styles.boldText}>{item?.title}</Text>
                                    <Text style={styles.boldText}>{formatDate(item?.createdAt)}</Text>
                                </View>
                                <View style={styles.flexColumn}>
                                    <Text>{item?.body}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    nofiticationList: {
        width: WIDTH,
        // justifyContent: "space-between",
        // alignItems: "center"
    },
    nofiticationTab: {
        width: WIDTH * 0.95,
        padding: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: WIDTH * 0.025,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    allReadView: {
        width: WIDTH,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    allReadButton: {
        margin: 10,
        paddingHorizontal: 15
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
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
        marginBottom: 5,
    },
})