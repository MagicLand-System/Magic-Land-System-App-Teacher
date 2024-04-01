import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const rateList = [
    {
        vn: "Bé có tiên bộ",
        eng: "prolapse",
    },
    {
        vn: "Xuất sắc",
        eng: "excellent",
    },
    {
        vn: "Làm tốt lắm",
        eng: "eoodjob",
    },
    {
        vn: "giỏi quá",
        eng: "verygood",
    },
    {
        vn: "Cố gắng lên nào",
        eng: "tryharder",
    },
    {
        vn: "Bé thực hiện tốt",
        eng: "doeswell",
    },
]

export default function ChooseRateModal({ visible, handleChangeStudentRate, rate, onCancle }) {

    const [choosedRate, setChoosedRate] = useState("")

    return (
        <Modal
            visible={visible}
            animationType="fate"
            transparent={true}
        >
            <TouchableOpacity style={styles.container} onPress={onCancle} activeOpacity={1}>
                <View style={styles.content}>
                    <Text style={{ textAlign: "center", ...styles.boldText, marginHorizontal: 5 }}>Chỉnh sửa đánh giá:</Text>
                    <View
                        style={{
                            ...styles.rateOption,

                        }}
                    >
                        <Text
                            style={{
                                color: "#4582E6",
                                textAlign: "center",
                                fontWeight: "600",
                                fontSize: 18
                            }}>
                            {rateList.find(obj => obj.eng.toLowerCase() === rate?.toLowerCase())?.vn}
                        </Text>
                    </View>
                    <View style={styles.contentList}>
                        {
                            rateList.map((item, key) => {
                                if (item.eng.toLowerCase() !== rate?.toLowerCase()) {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                ...styles.rateOption,
                                                backgroundColor: choosedRate?.toLowerCase() === item.eng.toLowerCase() ? "#4582E6" : "white",
                                                borderColor: choosedRate?.toLowerCase() !== item.eng.toLowerCase() ? "#4582E6" : "white",
                                            }}
                                            onPress={() => { setChoosedRate(item.eng) }}
                                            key={key}
                                        >
                                            <Text
                                                style={{
                                                    color: choosedRate?.toLowerCase() !== item.eng.toLowerCase() ? "#4582E6" : "white",
                                                }}>
                                                {item.vn}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                    <View style={styles.buttonList}>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#F86565" }} onPress={onCancle}>
                            <Text style={{ color: "white", ...styles.boldText }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#241468" }} onPress={() => handleChangeStudentRate(choosedRate)}>
                            <Text style={{ color: "white", ...styles.boldText }}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    content: {
        width: WIDTH * 0.8,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        zIndex: 10,
    },
    contentList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    rateOption: {
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "#4582E6",
        borderRadius: 10,
        margin: 5,
        marginVertical: 10,
    },
    buttonList: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    },
    button: {
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
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