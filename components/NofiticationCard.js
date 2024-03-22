import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function NofiticationCard({ notificationDetail, onClick }) {

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.flexColumnBetween}>
                <Text style={{ ...styles.boldText, fontSize: 16 }}>{notificationDetail?.title}</Text>
                <Text style={{ opacity: 0.6 }}>{notificationDetail?.time}</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <View style={{ width: WIDTH * 0.04, justifyContent: "center", alignItems: "center" }}>
                    <Icon name={"circle"} color={"#000000"} size={10} />
                </View>
                <Text style={{ width: WIDTH * 0.8 }}>
                    {notificationDetail?.message}
                </Text>
            </View>

        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.9,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#241468",
        marginVertical: 5,
        marginHorizontal: WIDTH * 0.05,

    },

    flexColumnAround: {
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
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
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },


});