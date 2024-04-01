import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import SpinnerLoading from '../SpinnerLoading';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function InputScoreModal({ visible, student, score, note, onCancle, onSubmit, onChooseRate, loading }) {

    const [tmpScore, setTmpScore] = useState(score)
    const [tmpNote, setTmpNote] = useState(note)

    useEffect(() => {
        setTmpScore(score ? score : 0)
        setTmpNote(note)
    }, [student, score, note])

    const handleSubmit = () => {
        onSubmit(tmpScore ? tmpScore : 0, tmpNote);
    }

    const handleInputScore = (text) => {
        const numericInput = text.replace(/[^0-9.,]/g, '');
        setTmpScore(numericInput);
        const inputNumber = parseFloat(numericInput);
        if (isNaN(inputNumber)) {
            setTmpScore('0');
            return;
        }
        if (inputNumber < 0) {
            setTmpScore('0');
        } else if (inputNumber > 10) {
            setTmpScore('10');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} />
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Nhập điểm cho học sinh {student?.studentName}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onCancle}>
                        <Icon name={"close"} color={"#794BFF"} size={22} />
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: "85%" }}>
                    <Text style={{ width: WIDTH * 0.2 }}>Điểm : </Text>
                    <TextInput
                        value={tmpScore}
                        onChangeText={handleInputScore}
                        style={styles.searchField}
                        placeholder={String(tmpScore)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ ...styles.flexColumnBetween, width: "85%" }}>
                    <Text style={{ width: WIDTH * 0.2 }}>Ghi chú : </Text>
                    <TouchableOpacity
                        style={styles.searchField}
                        onPress={onChooseRate}
                    >
                        <Text style={{ textAlign: "right", paddingVertical: 5 }}>{tmpNote ? tmpNote : "Chưa có đánh giá"}</Text>
                    </TouchableOpacity>
                    {/* <TextInput
                        value={tmpNote}
                        onChangeText={setTmpNote}
                        style={styles.searchField}
                        multiline={true}
                    /> */}
                </View>

                <View style={styles.confirm}>
                    <TouchableOpacity style={{ ...styles.confirmButton, padding: loading ? 0 : 10 }} onPress={() => handleSubmit()}>
                        {
                            loading ?
                                <SpinnerLoading />
                                :
                                <Text style={styles.confirmText}>
                                    XÁC NHẬN
                                </Text>
                        }

                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: HEIGHT * 0.3,
        left: WIDTH * 0.05,
        right: WIDTH * 0.05,
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
        color: "#3A0CA3"
    },
    phoneNumber: {
        color: "#858597",
        textAlign: "center",
        marginBottom: 10,
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    otpInput: {
        width: WIDTH * 0.1,
        height: WIDTH * 0.10,
        // borderColor: '#72AFD3',
        color: '#72AFD3',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    resendText: {
        color: "#3A0CA3",
        fontWeight: "600",
        marginLeft: 5,
        transform: [{ translateY: 2.5 }]
    },
    confirm: {
        marginBottom: 20,
    },
    confirmButton: {
        height: 40,
        // paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "#3D5CFF",
        alignItems: "center",
        overflow: "hidden"
    },
    confirmText: {
        color: "white",
        alignItems: "center"
    },
    closeButton: {
        position: "absolute",
        right: 20,
    },
    searchField: {
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.2)",
        textAlign: "right"
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
    flexColumnAround: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },
});