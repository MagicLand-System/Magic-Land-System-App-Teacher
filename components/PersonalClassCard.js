import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function PersonalClassCard({ cardDetail, check, index, onClick }) {

    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            {
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
            }
            <View style={{ ...styles.card, borderColor: colorList[(index % colorList.length)] }}>
                <View style={{ ...styles.flexColumn, marginLeft: 0, justifyContent: "space-between" }}>
                    <Text style={{ ...styles.cardName, color: colorList[(index % colorList.length)] }}>{cardDetail.title}</Text>
                    <View style={{ ...styles.status, backgroundColor: colorList[(index % colorList.length)] }}>
                        <Text style={{ ...styles.cardDetailText, color: "white" }}>{cardDetail.type}</Text>
                    </View>
                </View>

                <View style={{ ...styles.flexColumn, marginLeft: 0, marginTop: 10 }}>
                    <View style={{ ...styles.flexColumn, marginLeft: 0 }}>
                        <View style={{ ...styles.statusCircle, backgroundColor: cardDetail.status ? "#3AAC45" : "#D1D1D6" }} />
                        {
                            cardDetail.status ?
                                <Text style={{ ...styles.cardDetailText, color: colorList[(index % colorList.length)] }}>Online</Text>
                                :
                                <Text style={{ ...styles.cardDetailText, color: colorList[(index % colorList.length)] }}>Offline</Text>
                        }
                    </View>
                    <View style={styles.flexColumn}>
                        <Icon name={"notebook-multiple"} color={colorList[(index % colorList.length)]} size={18} />
                        <Text style={{ ...styles.cardDetailText, color: colorList[(index % colorList.length)] }}>{cardDetail.leasonAmount} buổi</Text>
                    </View>
                    <View style={styles.flexColumn}>
                        <Icon name={"calendar-check"} color={colorList[(index % colorList.length)]} size={18} />
                        <Text style={{ ...styles.cardDetailText, color: colorList[(index % colorList.length)] }}>Thứ 2 - 4- 6 (7h30 - 9h)</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        position: "relative",
        flexDirection: "row",
        marginBottom: 10,
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
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#42AEF4",
        borderRadius: 3,
        backgroundColor: "white"
    },
    card: {
        minWidth: WIDTH * 0.8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cardName: {
        color: "#241468",
        fontWeight: "700",
        fontSize: 18,
    },
    status:{
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 50,
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
    }
});