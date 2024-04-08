import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import { constants } from '../../constants/constants';
import { TimeContext } from '../../context/TimeContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Header({ goback, navigation, background, title }) {

    const { time } = useContext(TimeContext)
    const [currentTime, setCurrentTime] = useState(new Date(time));

    return (
        <View style={[styles.container, { backgroundColor: background ? background : constants.background }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    goback ? goback() : navigation?.pop();
                }}
            >
                <Icon name={"arrow-back-ios"} color={"white"} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
                {title}
            </Text>
            {/* {currentTime?.getHours()}:{currentTime?.getMinutes()} {currentTime?.getHours() > 12 ? "PM" : "AM"}  */}
            <Text style={styles.timeText}> {currentTime?.getDate()}/{currentTime?.getMonth() + 1}/{currentTime?.getFullYear() + 1}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: HEIGHT * 0.03
    },
    backButton: {
        position: "absolute",
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "flex-end",
        left: 0,
    },
    headerTitle: {
        width: "80%",
        paddingVertical: 10,
        color: "white",
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center",
    },
    timeText: {
        position: "absolute",
        color: "white",
        bottom: "40%",
        right: 5
    }
});
