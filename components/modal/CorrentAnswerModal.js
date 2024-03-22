import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CorrentAnswerModal({ visible, score }) {

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} />
            <View style={styles.container}>
                <Icon name={"check-circle"} color={"#2C8535"} size={60} />
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Giỏi quá!!!</Text>
                </View>
                <Text style={{ ...styles.modalHeaderText, color: "#3AAC45", margin: 10 }}>Chúc mừng bé được cộng {score} điểm.</Text>
                <Text style={{ ...styles.modalHeaderText, color: "#3AAC45", margin: 10 }}>Tiếp tục nào!!!</Text>


            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: HEIGHT * 0.38,
        left: WIDTH * 0.3,
        right: WIDTH * 0.3,
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
        fontWeight: "600",
        color: "#3AAC45"
    },
    submitButton: {
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#3D5CFF"
    },
    submitText: {
        padding: 10,
        paddingHorizontal: 30,
        color: "white",
    }
});