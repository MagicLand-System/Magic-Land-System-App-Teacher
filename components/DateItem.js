import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from 'react'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function DateItem({ date, dateSelected, scheduleList, selectedDate }) {

    const getCurrentDate = (date) => {
        const currentDate = scheduleList?.filter(item => item.date.substring(0, 10) === date?.dateString)
        return currentDate
    }

    const currentDate = getCurrentDate(date)

    return (
        <TouchableOpacity style={[styles.customDate, dateSelected === date?.dateString && styles.selectedDate]} onPress={() => { selectedDate(date.dateString) }}>
            <Text style={{ ...styles.boldText }}>{date.day}</Text>
            {
                currentDate && currentDate?.map((item, index) => {
                    return (
                        <View
                            style={{
                                ...styles.scheduleItem,
                                backgroundColor: index === 0 ?
                                    "#FF95CE80" :
                                    index === 1 ?
                                        "#52ACFF80"
                                        :
                                        "#92C88D80"
                            }}
                            key={index}
                        >
                            <Text
                                style={{
                                    ...styles.scheduleText,
                                    fontSize: 10,
                                    color: index === 0 ?
                                        "#F52798" :
                                        index === 1 ?
                                            "#4582E6"
                                            :
                                            "#15CA00"
                                }}
                                numberOfLines={1}>{item.className}</Text>
                        </View>
                    )
                })
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customDate: {
        width: "95%",
        height: HEIGHT * 0.09,
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C2C2C2"
    },
    selectedDate: {
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    scheduleItem: {
        backgroundColor: "#FF95CE80",
        paddingHorizontal: 1,
        borderRadius: 5,
        marginBottom: 3,
    },
    scheduleText: {
        color: "#F52798",
        fontWeight: "600"
    },
    boldText: {
        fontWeight: "600"
    },
});