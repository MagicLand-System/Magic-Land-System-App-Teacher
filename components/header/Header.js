import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import { constants } from '../../constants/constants';
import { TimeContext } from '../../context/TimeContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Header({ goback, navigation, background, title, hiddenBackButton }) {

    const { time } = useContext(TimeContext)
    const [currentTime, setCurrentTime] = useState(new Date(time));

    useEffect(() => {
        setCurrentTime(new Date(time))
    }, [time])

    return (
        <View style={[styles.container, { backgroundColor: background ? background : constants.background }]}>
            {
                !hiddenBackButton &&
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        goback ? goback() : navigation?.pop();
                    }}
                >
                    <Icon name={"arrow-back-ios"} color={"white"} size={28} />
                </TouchableOpacity>
            }
            <Text style={styles.headerTitle} numberOfLines={2}>
                {title}
            </Text>
            {/* {currentTime?.getHours()}:{currentTime?.getMinutes()} {currentTime?.getHours() > 12 ? "PM" : "AM"}  */}
            {/* <Text style={styles.timeText}> {currentTime?.getDate()}/{currentTime?.getMonth() + 1}/{currentTime?.getFullYear()}</Text> */}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{currentTime?.getHours()}:{currentTime?.getMinutes() > 9 ? currentTime?.getMinutes() : "0" + currentTime?.getMinutes()} {currentTime?.getHours() > 12 ? "PM" : "AM"}</Text>
                <Text style={styles.timeText}>{currentTime?.getDate()}/{currentTime?.getMonth() + 1}/{currentTime?.getFullYear()}</Text>
                {/* {currentTime?.getHours()}:{currentTime?.getMinutes()} */}
            </View>
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
        width: "65%",
        paddingVertical: 10,
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    timeContainer: {
        position: "absolute",
        bottom: "20%",
        right: 5
    },
    timeText: {
        color: "white",
    }
});
