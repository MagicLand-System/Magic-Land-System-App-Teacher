import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'

import Header from '../header/Header';
import ClassCard from '../ClassCard';
import { formatDate } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseScheduleModal({ visible, classList, selectSchedule, onCancle, navigation }) {

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} goback={onCancle} title={"Vui Lòng Chọn Lịch Học"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardList}>
                    <View style={styles.srollHeader}></View>
                    <View style={styles.scheduleOption} >
                        <View style={styles.scheduleTime}>
                            <Text> Lịch học </Text>
                        </View>
                        <View style={styles.scheduleDate}>
                            <Text>Ngày khai giảng</Text>
                        </View>
                        <View style={styles.scheduleMethod}>
                            <Text style={{ textTransform: "capitalize" }}>Hình thức</Text>
                        </View>
                    </View>
                    {
                        classList.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.scheduleOption} onPress={() => { selectSchedule(item) }} key={index} activeOpacity={0.7}>
                                    <View style={styles.scheduleTime}>
                                        <Text>Thứ {item?.schedule} - ( {item?.slot} )</Text>
                                    </View>
                                    <View style={styles.scheduleDate}>
                                        <Text>{formatDate(item?.openingDay)}</Text>
                                    </View>
                                    <View style={styles.scheduleMethod}>
                                        <Text style={{ textTransform: "capitalize" }}>{item?.method}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    cardList: {
        marginTop: 20,
        paddingHorizontal: WIDTH * 0.05
    },
    scheduleOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#4582E6"
    },
    scheduleTime: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderRightWidth: 1,
        borderColor: "#4582E6",
    },
    scheduleDate: {
        width: "30%",
        padding: 10,
        borderRightWidth: 1,
        borderColor: "#4582E6"
    },
    scheduleMethod: {
        width: "20%",
        padding: 10,
    },

    srollHeader: {
        marginBottom: 20,
    },
});