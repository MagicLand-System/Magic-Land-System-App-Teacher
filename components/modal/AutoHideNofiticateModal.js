import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function NotificationModal({ visible, title, content, onCancle }) {

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} onPress={onCancle} />
            <View style={styles.container}>

                {/* <Icon name={"check-circle"} color={"#C71212"} size={60} /> */}
                {
                    title &&
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>{title}</Text>
                    </View>
                }
                {content && content}
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
        borderRadius: 15,
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
        fontWeight: "700",
        fontSize: 18
        // color: "#C71212"
    },

});