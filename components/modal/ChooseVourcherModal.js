import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../header/Header';
import { formatPrice } from '../../util/util';

import voucherBackground from "../../assets/voucherBackround.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseVourcherModal({ visible, vourcherList, onCancle, onChoose, discount, navigation }) {

    const VoucherTab = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.vourcherCard} onPress={() => onChoose(index)}>
                <Image source={voucherBackground} style={styles.voucherBackground} resizeMode="cover" />
                <View style={styles.vourcherLeft}>
                    <Text style={styles.vourcherLeftTitle}>Siêu Ưu Đãi</Text>
                    <Text style={styles.vourcherLeftValue}>{item?.value} %</Text>
                </View>
                <View style={styles.vourcherRight}>
                    <Text style={{ ...styles.boldText, color: "#241468" }}>Giảm tối đa {formatPrice(item.max)}đ </Text>
                    <Text style={{ ...styles.boldText, fontWeight: "500" }}>Đơn tối thiểu {formatPrice(item.minUse)}đ</Text>
                    <Text style={styles.smallText}>{item?.content}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} goback={onCancle} title={"Chọn mã giảm giá"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.vourcherList}>
                    {
                        vourcherList.map((item, index) => {
                            return (
                                <View key={index}>
                                    {
                                        index !== 0 &&
                                        <View style={styles.dashline} />
                                    }
                                    <VoucherTab item={item} index={index} />
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <Text style={styles.choosedText}>{discount !== 0 ? 1 : 0} Voucher đã được chọn. Bạn được giảm {formatPrice(discount)}đ</Text>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    vourcherList: {
        marginTop: 20,
        paddingHorizontal: WIDTH * 0.05,
        // alignItems: "center",
        // justifyContent: "center"
    },
    vourcherCard: {
        position: "relative",
        width: WIDTH * 0.8,
        flexDirection: "row",
        marginVertical: 10,
    },
    dashline: {
        width: WIDTH * 0.82,
        height: 2,
        backgroundColor: "#F9ACC0",
        marginVertical: 5,
        marginTop: 12,
    },
    voucherBackground: {
        position: "absolute",
        width: "100%",
        top: 0,
        // bottom: 0,
        right: 0,
        left: 0,
    },
    vourcherLeft: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    vourcherRight: {
        width: "72%",
        padding: 5,
        paddingHorizontal: 10,
    },
    vourcherLeftTitle: {
        color: "white",
        fontWeight: "700",
        fontSize: 12,
    },
    vourcherLeftValue: {
        color: "white",
        fontWeight: "700",
        fontSize: 18,
    },
    boldText: {
        fontSize: 10,
        fontWeight: "700",
        marginBottom: 3
    },
    smallText: {
        fontSize: 8
    },
    choosedText: {
        paddingVertical: 10,
        paddingBottom: 40,
        color: "#241468"
    }
});