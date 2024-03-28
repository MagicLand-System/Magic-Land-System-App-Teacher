import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertSchedulesToString, formatDate, formatPrice, getVnDay, shortedTime } from '../util/util';
import defaultImage from "../assets/classCard/classicMath.png"
import { courseSelector } from '../store/selector';
import { useSelector } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function ClassCartCard({ cardDetail, check, index, onClick, background, priceHidden, timeType, buttonList }) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => { onClick(cardDetail?.classId) }} key={index}>
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
                            cardDetail?.choose &&
                            <View style={styles.checkBox}>
                                <Icon name={"check"} color={"#C2D9FF"} size={16} />
                            </View>
                        }

                    </>
                }

                <View style={styles.cardImage}>
                    <Image
                        source={defaultImage}
                        resizeMode="cover"
                        style={styles.cardImageValue}
                    />
                    <View style={styles.classType}>
                        <Text style={{ textTransform: "capitalize", color: "#4C6ED7", fontWeight: "600", fontSize: 12 }}>{cardDetail?.classSubject ? cardDetail?.classSubject : "Khoá Học"}</Text>
                    </View>
                </View>
                <View style={styles.cardDetail}>
                    <View style={{ ...styles.flexColumnBetween, marginTop: 5, paddingRight: 10 }}>
                        <Text style={{ ...styles.cardName, maxWidth: "75%" }} numberOfLines={1}>{
                            cardDetail?.courseName ?
                                cardDetail?.courseName
                                :
                                cardDetail?.className ?
                                    cardDetail?.className
                                    :
                                    "Lớp học"}</Text>
                        {
                            !priceHidden &&
                            <Text style={{ ...styles.cardName, color: "#241468", fontSize: 10 }}>{cardDetail?.coursePrice ? formatPrice(cardDetail?.coursePrice) : formatPrice(0)}đ</Text>
                        }
                    </View>
                    <Text style={{ fontSize: 10, color: "#4F4F4F", marginVertical: 5 }}>Lớp: {cardDetail?.classCode} - <Text style={{ fontSize: 12, color: "#4F4F4F", textTransform: "capitalize" }}>{cardDetail?.method}</Text></Text>
                    <View style={styles.flexColumn}>
                        <Icon name={"calendar-check"} color={"#241468"} size={15} />
                        <Text style={styles.cardDetailText}>{formatDate(cardDetail?.startDate ? cardDetail?.startDate : cardDetail?.date)}</Text>
                    </View>
                    <View style={{ ...styles.flexColumn, marginVertical: 5 }}>
                        <Icon name={"clock-time-three-outline"} color={"#241468"} size={15} />
                        {
                            timeType === "onDate" ?
                                <Text style={styles.cardDetailText}>{getVnDay(cardDetail?.dayOfWeeks ? cardDetail?.dayOfWeeks : "Monday")} ( {shortedTime(cardDetail?.slot ? cardDetail?.slot?.startTime : cardDetail?.startTime)} - {shortedTime(cardDetail?.slot ? cardDetail?.slot?.endTime : cardDetail?.endTime)} )</Text>
                                :
                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                    {
                                        convertSchedulesToString(cardDetail?.schedules)?.map((item, key) => {
                                            return (
                                                <React.Fragment key={key}>
                                                    <Text style={styles.cardDetailText}>Thứ {item?.dates}</Text>
                                                    <Text style={styles.cardDetailText}> ({item?.time})</Text>
                                                </React.Fragment>

                                            )
                                        })
                                    }
                                </View>
                        }
                    </View>
                    <View style={{ ...styles.flexColumn, width: "92%" }}>
                        <Icon name={"map-marker-radius"} color={"#241468"} size={16} />
                        <Text style={styles.cardDetailText}>{cardDetail?.room ? "Phòng " + cardDetail?.room?.name + " - Tầng " + cardDetail?.room?.floor : cardDetail?.address}</Text>
                        {/*+ " - " {cardDetail?.address} */}
                    </View>
                    {
                        buttonList &&
                        <View style={styles.buttonContainer}>
                            {
                                buttonList?.map((item, key) => {
                                    if (key === 0) {
                                        return (
                                            < TouchableOpacity onPress={() => item.onPress(cardDetail)} style={{ ...styles.cardButton, borderRightWidth: 1 }}>
                                                <Text style={{ fontSize: 10 }}>{item?.label}</Text>
                                            </TouchableOpacity>
                                        )

                                    } else {
                                        return (
                                            <TouchableOpacity onPress={() => item.onPress(cardDetail)} style={styles.cardButton}>
                                                <Text style={{ fontSize: 10 }}>{item?.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }


                        </View>
                    }
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        maxHeight: HEIGHT * 0.2,
        position: "relative",
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: "2.5%",
        transform: [{ translateX: -10 }]
    },
    checkBox: {
        position: "absolute",
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: "#241468",
        borderRadius: 15,
        backgroundColor: "#241468",
        left: "96.8%",
        bottom: "93%",
        zIndex: 999
    },
    classType: {
        position: "absolute",
        padding: 5,
        borderRadius: 10,
        left: "3%",
        top: "3%",
        backgroundColor: "white"
    },
    card: {
        position: "relative",
        width: "100%",
        height: "90%",
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "rgba(36, 20, 104, 1)",
        marginLeft: 10,
        marginBottom: 20,
        flexDirection: "row"
    },
    cardImage: {
        position: "relative",
        width: "35%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden"
    },
    cardImageValue: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    cardDetail: {
        position: "relative",
        width: "60%",
        paddingLeft: "5%"
    },
    cardName: {
        // color: "#241468",
        fontWeight: "700",
        fontSize: 12,
    },
    cardDetailText: {
        color: "#4F4F4F",
        fontSize: 10,
        marginLeft: 3
    },
    buttonContainer: {
        position: "absolute",
        bottom: "2%",
        right: "10%",
        left: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10
    },
    cardButton: {
        padding: 3,
        width: "50%",
        justifyContent: "center",
        alignItems: "center"
    },

    flexColumn: {
        flexDirection: "row",
        // alignItems: "center",
    },
    flexColumnBetween: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});