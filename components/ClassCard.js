import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function ClassCard({ cardDetail, check, index, onClick, background }) {

    const getSchedule = (item) => {
        switch (item?.schedules[0].dayOfWeeks) {
            case "Monday":
                return "Thứ 2 - 4 - 6 (7h30 - 9h)"
            case "Tuesday":
                return "Thứ 3 - 5 - 7 (7h30 - 9h)"
            case "Saturday":
                return "Thứ 7 - Cn (7h30 - 9h)"

            default:
                break;
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { onClick(cardDetail.classId) }}>
            {/* {
                check &&
                <>
                    <View style={styles.checkBoxLine} />
                    <View style={styles.checkBox}>
                        {
                            cardDetail.choose &&
                            <Icon name={"check"} color={"#42AEF4"} size={16} />
                        }
                    </View>
                </>
            } */}
            <View
                style={{
                    ...styles.card,
                    backgroundColor: index % 2 === 1 ?
                        "white"
                        :
                        background ?
                            background
                            :
                            "#C2D9FF",
                    borderColor: background ?
                        background
                        :
                        "#C2D9FF",
                    borderWidth: index % 2 === 1 ? 1 : 0
                }}>
                {
                    check &&
                    <>
                        {/* <View style={styles.checkBoxLine} /> */}
                        {
                            cardDetail.choose &&
                            <View style={styles.checkBox}>
                                <Icon name={"check"} color={"#C2D9FF"} size={20} />
                            </View>
                        }

                    </>
                }
                <View style={styles.flexColumnBetween}>
                    <Text style={styles.cardName}>{cardDetail.className ? cardDetail.className : "Toán cấp 1"}</Text>

                </View>

                <View style={{ ...styles.flexColumn, marginTop: 5 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <View style={{ ...styles.flexColumn, marginLeft: 0 }}>
                            <View style={{ ...styles.statusCircle, backgroundColor: cardDetail?.method === "ONLINE" ? "#3AAC45" : "#888888" }} />
                            {
                                cardDetail?.method === "ONLINE" ?
                                    <Text style={styles.cardDetailText}>Online</Text>
                                    :
                                    <Text style={styles.cardDetailText}>Offline</Text>
                            }
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"notebook-multiple"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>Khai giảng ngày: {cardDetail?.startDate ? formatDate(cardDetail?.startDate) : 0}</Text>
                    </View>
                </View>

                <View style={{ ...styles.flexColumn, marginTop: 5 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <Icon name={"account-multiple"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail.limitNumberStudent ? cardDetail.limitNumberStudent : 0} Học Viên</Text>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"account"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail?.lecture?.fullName ? cardDetail?.lecture?.fullName : "Chưa có GV"}</Text>
                    </View>
                </View>

                <View style={{ ...styles.flexColumn, marginTop: 10 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <Icon name={"calendar-check"} color={"#241468"} size={18} />
                        <View>
                            <Text style={styles.cardDetailText}>Lịch học: {cardDetail?.schedules?.schedule} ({cardDetail?.schedules?.slot})</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"map-marker-radius"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail?.address ? cardDetail?.address : "Chưa có địa chỉ"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 80,
        position: "relative",
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "center",
    },
    checkBoxLine: {
        position: "absolute",
        height: "100%",
        width: 1,
        backgroundColor: "#42AEF4",
        left: 10,
        top: 10,
    },
    checkBox: {
        position: "absolute",
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: "#241468",
        borderRadius: 15,
        backgroundColor: "#241468",
        left: "101%",
        bottom: "105%"
    },
    card: {
        position: "relative",
        minWidth: WIDTH * 0.8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 20,
    },
    cardName: {
        color: "#241468",
        fontWeight: "700",
        fontSize: 18,
    },
    statusCircle: {
        width: 12,
        height: 12,
        borderRadius: 50,
        marginRight: 2,
    },
    cardDetailText: {
        color: "#241468",
        fontSize: 12,
        marginLeft: 3
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