import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getClassByClassId } from '../../api/class';

import SpinnerLoading from "../../components/SpinnerLoading"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassOptionScreen({ route, navigation }) {
    const classId = route.params.classId
    const date = route.params.date
    const slot = route.params.slot
    const noSession = route.params.noSession
    const [classDetail, setClassDetail] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadClassData()
    }, [])

    const loadClassData = async () => {
        setLoading(true)
        const response = await getClassByClassId(classId)
        if (response?.status === 200) {
            setClassDetail(response?.data)
        } else {
            console.log(response?.response?.data);
        }
        setLoading(false)
    }

    const ClassOption = ({ icon, title, onClick }) => {
        return (
            <TouchableOpacity style={styles.classOption} onPress={onClick}>
                <View style={styles.classOptionContainer}>
                    <View style={styles.flexColumn}>
                        {icon}
                        <Text style={{ ...styles.boldText, marginLeft: 10 }}>{title}</Text>
                    </View>
                    <Icon name={"chevron-right"} color={"#000000"} size={25} />
                </View>
            </TouchableOpacity>
        )
    }

    const optionList = [
        {
            title: "Điểm danh",
            icon: <Icon name={"book"} color={"#4582E6"} size={25} />,
            onClick: () => {
                navigation.push("AttendanceScreen", { classDetail: classDetail, date: date, slot: slot })
                // console.log(date);
            }
        },
        {
            title: "Chấm điểm bài tập",
            icon: <Icon name={"book"} color={"#4582E6"} size={25} />,
            onClick: () => {
                navigation.push("RateStudentScreen", { classDetail: classDetail, date: date })
                // console.log(date);
            }
        },
    ]

    return (
        <>

            <Header navigation={navigation} title={classDetail?.title} goback={navigation.pop} />
            {
                loading ? <SpinnerLoading />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Đánh giá buổi học:</Text>
                        </View>
                        {
                            optionList.map((item, key) => (
                                <ClassOption title={item.title} icon={item.icon} onClick={item.onClick} key={key} />
                            ))
                        }
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Đánh giá tổng quan: </Text>
                        </View>
                        <Text style={{ opacity: 0.6, marginLeft: WIDTH * 0.04 }}>Đánh giá sau khi các bé hoàn thành khóa học</Text>
                        <ClassOption
                            title={"Đánh giá"}
                            icon={<Icon name={"book"} color={"#4582E6"} size={25} />}
                            onClick={() => navigation.push("RateStudentScreen", { classDetail: classDetail, date: date, noSession: noSession })}
                        />

                    </ScrollView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    classOption: {
        width: WIDTH,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    classOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#D9D9D9"
    },

    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },
    boldText: {
        fontWeight: "600",
    },
})