import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import OTPTextInput from "react-native-otp-textinput"
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function NotificationModal({ visible }) {

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} />
            <View style={styles.container}>
                <Icon name={"check-circle"} color={"#C71212"} size={60} />
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Đã Thêm Vào Giỏ Hàng</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: HEIGHT * 0.45,
        left: WIDTH * 0.2,
        right: WIDTH * 0.2,
        paddingVertical: 20,
        borderRadius:  15,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    layout: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    modalHeader: {
        position: "relative",
        width: "100%",
        padding: 20,
        paddingBottom: 0,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#C8A9F1"
    },
    modalHeaderText: {
        fontWeight: "600",
        color: "#C71212"
    },

});