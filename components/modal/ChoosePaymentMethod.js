import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from 'react'

import { getWalletBalance } from "../../api/transaction"

import { formatPrice } from "../../util/util"

import Header from '../header/Header';
import { useFocusEffect } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChoosePaymentMethod({ visible, paymentMethodList, setPaymentMethodList, onCancle, navigation, price }) {

    const [dropdownButton, setDropdownButton] = useState(Array(paymentMethodList.length).fill(false));
    const [wallet, setWallet] = useState({})

    // useEffect(() => {

    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            loadWalletData()
        }, [])
    );

    const loadWalletData = async () => {
        const response = await getWalletBalance()
        if (response?.status === 200) {
            setWallet(response?.data)
        }
        checkWallet()
    }

    const checkWallet = () => {
        if (wallet?.balance < price) {
            setDropdownButton((prevStudentList) => {
                return prevStudentList.map((item, currentIndex) => (
                    item = currentIndex === 0 ? true : false
                ));
            });
        }
    }

    const handleChoosePaymentMethod = (id, index) => {
        setPaymentMethodList((prevStudentList) => {
            const index = prevStudentList.findIndex(obj => obj.id === id);
            if (index === 0 && wallet?.balance < price) {
                return prevStudentList.map((item, i) => ({
                    ...item,
                }));
            } else {
                return prevStudentList.map((item, i) => ({
                    ...item,
                    check: i === index ? true : false,
                }));
            }

        });
        setDropdownButton((prevStudentList) => {
            return prevStudentList.map((item, currentIndex) => (
                item = currentIndex === index ? prevStudentList[index] : false
            ));
        });
    }

    const handlePress = (index) => {
        const updatedStates = [...dropdownButton];
        updatedStates[index] = !updatedStates[index];
        setDropdownButton(updatedStates);
    };

    const handleNavigate = (item) => {
        navigation.push("RechargeScreen", { paymentMethod: item })
        onCancle()
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} goback={onCancle} title={"Phương thức thanh toán"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentMethodList}>
                    {
                        paymentMethodList.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <TouchableOpacity
                                        style={{
                                            ...styles.paymentMethod,
                                            backgroundColor: "white",
                                            borderTopWidth: index !== 0 ? 1 : 0
                                        }}
                                        onPress={() => handleChoosePaymentMethod(item.id, index)}

                                    >
                                        <View style={{ ...styles.flexDirectionBetween, width: "50%" }}>
                                            {
                                                !item.check ?
                                                    <Icon name={"circle-outline"} color={"#888888"} size={20} />
                                                    :
                                                    <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={20} />
                                            }
                                            <View style={{ padding: 5, borderWidth: 1, borderRadius: 15, borderColor: "#241468", backgroundColor: "white" }}>
                                                <Image
                                                    source={item.img}
                                                    resizeMode='contain'
                                                    style={styles.paymentIcon}
                                                />
                                            </View>
                                            <Text style={{ ...styles.boldText, color: "#241468", width: "40%" }}>{item.name}</Text>
                                        </View>
                                        {
                                            item.dropdown &&
                                            <TouchableOpacity style={{ ...styles.flexDirectionBetween, justifyContent: "flex-end", width: "20%" }}
                                                onPress={() => handlePress(index)}
                                            >
                                                {
                                                    dropdownButton[index] ?
                                                        <Icon name={"chevron-up"} color={"#241468"} size={30} />
                                                        :
                                                        <Icon name={"chevron-down"} color={"#241468"} size={30} />
                                                }

                                            </TouchableOpacity>
                                        }
                                    </TouchableOpacity>
                                    {
                                        dropdownButton[index] &&
                                        <View style={{
                                            width: WIDTH * 0.9,
                                            marginHorizontal: WIDTH * 0.05,
                                            marginBottom: 20
                                        }}>
                                            <View style={{
                                                ...styles.flexDirectionBetween,

                                                marginTop: 10,
                                                borderTopWidth: 1,
                                                paddingVertical: 20,
                                                borderColor: "#D9D9D9"
                                            }}>
                                                <Text style={styles.boldText}>Tổng số tiền trong Ví:</Text>
                                                <Text style={{ ...styles.boldText, color: "#241468" }}>{formatPrice(wallet?.balance)}đ</Text>
                                            </View>
                                            <View style={{
                                                justifyContent: "flex-end",
                                                alignItems: "flex-end",
                                                paddingRight: WIDTH * 0.05
                                            }}>
                                                <TouchableOpacity style={{
                                                    width: 100,
                                                    backgroundColor: "#241468",
                                                    padding: 15,
                                                    borderRadius: 10,
                                                }}
                                                    onPress={() => handleNavigate(item)}
                                                >
                                                    <Text style={{
                                                        ...styles.boldText,
                                                        color: "white",
                                                        textAlign: "center"
                                                    }}>Nạp Tiền</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.bottomButonContainer}>
                    <TouchableOpacity style={styles.bottomButton} onPress={onCancle}>
                        <Text style={{ ...styles.boldText, color: "white" }}>Đồng ý</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "white"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    paymentMethodList: {
        // paddingVertical: 20,
    },
    paymentMethod: {
        flexDirection: "row",
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.05,
        paddingVertical: 10,
        borderColor: "#D9D9D9",
        justifyContent: "space-between",
    },
    paymentIcon: {
        height: WIDTH * 0.15,
        width: WIDTH * 0.15,
    },
    bottomButonContainer: {
        width: WIDTH,
        position: "absolute",
        bottom: HEIGHT * 0.05,
        justifyContent: 'center',
        alignItems: "center"
    },
    bottomButton: {
        backgroundColor: "#241468",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },

    flexColumn: {
        flexDirection: "row",
    },
    flexDirectionBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    boldText: {
        fontWeight: "600"
    },
});