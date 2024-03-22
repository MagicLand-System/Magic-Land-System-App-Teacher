import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate, formatPrice, formatTime, getVnDay, shortedTime } from '../util/util';
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

export default function StudentCard({ student, check, index, onClick }) {

    const hexToRGBA = (hex, alpha) => {
        const hexColor = hex.replace(/^#/, '');
        const bigint = parseInt(hexColor, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => onClick(student)}>
            <View style={{ ...styles.studentImage, borderColor: colorList[(index % colorList.length)], backgroundColor: hexToRGBA(colorList[(index % colorList.length)], 0.5) }}>
                {
                    check &&
                    <View style={{ ...styles.studentCheck, backgroundColor: colorList[(index % colorList.length)] }}>
                        <Icon name={"check-bold"} color={"white"} size={13} />
                    </View>
                }
                {
                    student?.avatarImage ?
                        <View style={{ ...styles.studentAvt, overflow: "hidden" }}>
                            <Image
                                source={{ uri: student?.avatarImage }}
                                style={styles.studentAvt}
                                resizeMode="cover"
                            />
                        </View>
                        :
                        <Icon name={"account"} color={colorList[(index % colorList.length)]} size={65} />
                }

            </View>
            <View>
                <View style={{ ...styles.studentNameView }}>
                    <Text style={{ ...styles.studentName, color: colorList[(index % colorList.length)] }}>
                        Tên : {student?.fullName}
                    </Text>
                </View>
                <View style={{ ...styles.studentNameView }}>
                    <Text style={{ ...styles.studentName, color: colorList[(index % colorList.length)] }}>
                        Sinh Nhật : {formatDate(student?.dateOfBirth)}
                    </Text>
                </View>
                <View style={{ ...styles.studentNameView }}>
                    <Text style={{ ...styles.studentName, color: colorList[(index % colorList.length)] }}>
                        Giới tính : {student?.gender}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.8,
        maxHeight: HEIGHT * 0.15,
        // padding: 10,
        // borderWidth: 1,
        borderRadius: 150,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 10,
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    studentImage: {
        position: "relative",
        width: WIDTH * 0.15,
        height: WIDTH * 0.15,
        borderWidth: 3,
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    studentCheck: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 2,
        borderRadius: 50,
        zIndex: 999
    },
    studentAvt: {
        width: "100%",
        height: "100%",
        borderRadius: 150,
    },
    studentNameView: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 50,
        margin: 10,
        marginHorizontal: 15
    },
    studentName: {
        fontWeight: "600",
        fontSize: 12,
    }
}); 