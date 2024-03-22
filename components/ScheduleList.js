import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertSchedulesToString, formatDate } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function ScheduleList({ cardList, onClick }) {

    return (
        <View style={styles.container}>
            <View style={[styles.tableColumn, styles.flexColumn]}>
                <View style={{ ...styles.checkColumn, backgroundColor: "#4582E6" }}></View>
                <View style={{ ...styles.scheduleColumn, backgroundColor: "#4582E6" }}>
                    <Text style={{ textAlign: "center", fontWeight: "700", color: "white" }}>Lịch học</Text>
                </View>
                <View style={{ ...styles.startDateColumn, backgroundColor: "#4582E6" }}>
                    <Text style={{ textAlign: "center", fontWeight: "700", color: "white" }}>Ngày khai giảng</Text>
                </View>
                <View style={{ ...styles.typeColumn, backgroundColor: "#4582E6" }}>
                    <Text style={{ textAlign: "center", fontWeight: "700", color: "white" }}>Hình thức</Text>
                </View>
            </View>
            {
                cardList.map((item, index) => {
                    return (
                        item.status === "UPCOMING" &&
                        <TouchableOpacity
                            style={[styles.tableColumn, styles.flexColumn]}
                            onPress={() => { onClick(item.classId) }}
                            activeOpacity={0.9}
                            key={index}
                        >
                            <View style={{ ...styles.checkColumn, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: "#4582E6" }}>
                                {
                                    item.choose ?
                                        <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={35} />
                                        :
                                        <Icon name={"circle-outline"} color={"#888888"} size={35} />
                                }
                            </View>
                            <View style={{ ...styles.scheduleColumn, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: "#4582E6" }}>
                                {
                                    convertSchedulesToString(item?.schedules)?.map((item, key) => {
                                        return (
                                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", }} key={key}>
                                                <Text style={{ textAlign: "center", fontWeight: "700", color: "#4582E6", fontSize: 10 }}>Thứ {item?.dates}</Text>
                                                <Text style={{ textAlign: "center", fontWeight: "700", color: "#4582E6", fontSize: 10 }}> ({item?.time})</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ ...styles.startDateColumn, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: "#4582E6" }}>
                                <Text style={{ textAlign: "center", fontWeight: "700", color: "#4582E6" }}>{formatDate(item?.startDate)}</Text>
                            </View>
                            <View style={{ ...styles.typeColumn, borderWidth: 1, borderTopWidth: 0, borderColor: "#4582E6" }}>
                                <Text style={{ textAlign: "center", fontWeight: "700", color: "#4582E6", textTransform: "capitalize" }}>{item?.method}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 80,
        position: "relative",
        // flexDirection: "row",
        marginBottom: 10,
        // justifyContent: "center",
        transform: [{ translateX: -WIDTH * 0.025 }]
    },
    tableColumn: {
        width: "100%",
        flex: 1
        // paddingVertical: 5,
    },
    checkColumn: {
        width: 40,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    scheduleColumn: {
        width: "35%",
        height: "100%",
        justifyContent: "center",
    },
    startDateColumn: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
    },
    typeColumn: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
    },

    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
    },
    flexColumnBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});