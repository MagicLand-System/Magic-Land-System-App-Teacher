import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function FilterCustomModal({ visible, content, onCancle, onSubmit, onClear }) {

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} onPress={onCancle} />
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onCancle}>
                        <Icon name={"close"} color={"#4582E6"} size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        Tìm Kiếm
                    </Text>
                </View>
                <ScrollView style={styles.contentScrollView}>
                    {content}
                </ScrollView>
                <View style={styles.modalBottom}>
                    <TouchableOpacity style={styles.cancleButton} onPress={onClear}>
                        <Text style={styles.cancleText}>
                            Xóa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                        <Text style={styles.submitText}>
                            Tìm Kiếm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 20,
        borderRadius: 30,
        backgroundColor: "white"
    },
    contentScrollView: {
        height: HEIGHT * 0.6
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
        paddingTop: 20,
        marginBottom: 30,
        alignItems: "center",
    },
    closeIcon: {
        position: "absolute",
        bottom: -5,
        left: 18,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4582E6"
    },
    modalBottom: {
        paddingTop: 5,
        marginBottom: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cancleButton: {
        padding: 20,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: "#4582E6",
        borderRadius: 15,
    },
    cancleText: {
        color: "#4582E6",
        fontWeight: "600"
    },
    submitButton: {
        padding: 20,
        paddingHorizontal: 50,
        borderRadius: 15,
        marginLeft: 20,
        backgroundColor: "#4582E6",
    },
    submitText: {
        color: "white",
        fontWeight: "600"
    }
});