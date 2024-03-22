import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function ProcessBar({ leftLable, leftWidth, rightLabel, rightWidth, mainLabel }) {
    return (
        <View style={styles.container}>
            <Text style={styles.mainLabel}>
                {mainLabel}
            </Text>
            <View style={styles.fullBar}>
                <View style={{ ...styles.processed, width: leftWidth + 15 }}>
                    <Text style={styles.processedText} numberOfLines={1}>
                        {leftLable}
                    </Text>
                    {
                        rightWidth !== 0 &&
                        <View style={styles.dashLine} />
                    }
                </View>
                <View style={{ ...styles.processLeft, width: rightWidth - 13 }}>
                    <Text style={styles.processLeftText} numberOfLines={1}>
                        {rightLabel}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
    },
    fullBar: {
        flexDirection: "row",
        width: WIDTH * 0.9,
        borderWidth: 1,
        borderColor: "#3AAC45",
        marginHorizontal: WIDTH * 0.05,
        overflow: "hidden"
    },
    mainLabel: {
        color: "#3AAC45",
        textAlign: "right",
        fontWeight: "600",
        paddingRight: WIDTH * 0.05,
    },
    processed: {
        position: "relative",
        backgroundColor: "#3AAC45",
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingRight: 15,
    },
    processedText: {
        color: "white",
        textAlign: "right"
    },
    processLeft: {
        backgroundColor: "#F4F4F4",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    processLeftText: {
        color: "#3AAC45",
    },
    dashLine: {
        width: 15,
        height: 100,
        position: "absolute",
        backgroundColor: "#F4F4F4",
        right: -18,
        bottom: -10,
        transform: [{ rotateZ: "15deg" }]
    },
});