import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialIcons";

import unhappyIcon from "../../assets/rateIcon/unhapppyIcon.png"
import happyIcon from "../../assets/rateIcon/happyIcon.png"
import ContentedIcon from "../../assets/rateIcon/ContentedIcon.png"
import { getAttendanceList, getAttendanceListByDate, takeAttendance } from '../../api/teacher';
import { checkCurrentDate } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function AttendanceScreen({ route, navigation }) {

    const classDetail = route.params.classDetail
    const date = route.params.date
    const slot = route.params.slot
    const [studentList, setStudentList] = useState([])
    const [studentTmpList, setStudentTmpList] = useState([])
    const [edittingMode, setEdittingMode] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    // JSON.parse(JSON.stringify(studentListDefault))
    useEffect(() => {
        loadStudentData()
    }, [route.params.classDetail])

    const loadStudentData = async () => {
        const response = await getAttendanceListByDate(classDetail.classId, date)
        console.log(classDetail.classId, date);
        if (response?.status === 200) {
            console.log(response.data.attendanceInformation);
            // const data = response?.data?.map((item) => {
            //     return {
            //         ...item,
            //         isPresent: item?.isPresent ? item?.isPresent : false
            //     }
            // })
            // setStudentList(data)
            // setStudentTmpList(data)

            setStudentList(response?.data?.attendanceInformation)
            setStudentTmpList(response?.data?.attendanceInformation)
        } else {

        }
    }

    const handleCheckAttend = (id) => {
        if (edittingMode) {
            const index = studentTmpList.findIndex(obj => obj.studentId === id);
            const updateArray = JSON.parse(JSON.stringify(studentTmpList))
            // const updateArray = [...studentList]
            if (updateArray[index]) {
                const defaultStatus = updateArray[index].isPresent ? true : false
                updateArray[index].isPresent = !defaultStatus;
            }
            setStudentTmpList(updateArray)
        }

    }

    const handleCompleteAttend = async () => {
        const response = await takeAttendance(classDetail?.classId, convertNullToFalse(studentTmpList), String(slot).replace(/\s/g, ''))
        console.log(classDetail?.classId, studentTmpList, String(slot).replace(/\s/g, ''));
        if (response?.status === 200) {
            setStudentList(JSON.parse(JSON.stringify(studentTmpList)))
            setEdittingMode(false)
            console.log("take attendance successfull");
        } else {
            console.log("take attendance fail : ", response?.response?.data);
        }
    }

    const handleClearAttend = () => {
        setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
        setEdittingMode(false)
    }

    const handleSetEditing = () => {
        setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
        setEdittingMode(true)
    }

    function convertNullToFalse(studentTmpList) {
        return studentTmpList.map(student => {
            if (student.isPresent === null) {
                student.isPresent = false;
            }
            return student;
        });
    }

    const getAttendList = () => {
        const attendList = studentList.filter(obj => obj.status === true);
        return attendList
    }

    const filterByStudentName = (studentList, search) => {
        if (search === "") {
            return studentList
        } else {
            return studentList.filter(student => student.studentName.toLowerCase().includes(search.toLowerCase()));
        }
    }

    return (
        <>
            <Header navigation={navigation} title={"Lớp " + classDetail?.classCode + " - Điểm danh"} goback={navigation.pop} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Danh sách lớp:</Text>
                </View>
                <View style={styles.searchBar}>
                    <Icon name={"search"} color={"#908484"} size={28} />
                    <TextInput value={searchValue} onChangeText={setSearchValue} style={styles.searchField} placeholder={"Tìm kiếm học viên..."} placeholderTextColor="#B8B8D2" />
                </View>

                {
                    studentList[0] ?
                        <View style={styles.studentList}>
                            <View style={{ ...styles.tableColumn, backgroundColor: "#2414686B" }}>
                                <Text style={styles.columnNumber}>STT</Text>
                                <Text style={styles.columnName}>Tên học viên</Text>
                                <Text style={styles.columnStatus}>Trạng thái</Text>
                                <Text style={styles.columnNote}>Ghi chú</Text>
                            </View>
                            {
                                filterByStudentName((edittingMode ? studentTmpList : studentList), searchValue).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => handleCheckAttend(item.studentId)}
                                            style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#707070" }}
                                            key={index}>
                                            <View style={styles.columnNumber}>
                                                <Text style={{ ...styles.boldText, marginHorizontal: 5, marginRight: 2 }}>{index + 1}</Text>
                                                <Icon name={"account-circle"} color={"#908484"} size={WIDTH * 0.13} />
                                            </View>
                                            <Text style={styles.columnName}>{item?.studentName}</Text>
                                            <View style={styles.columnStatus}>
                                                {
                                                    item?.isPresent ?
                                                        <View style={styles.checkIcon}>
                                                            <Icon name={"check"} color={"#3AAC45"} size={12} />
                                                        </View>
                                                        :
                                                        item?.isPresent === false ?
                                                            <View style={{ transform: [{ rotateZ: "45deg" }] }}>
                                                                <Icon name={"add-circle-outline"} color={"red"} size={18} />
                                                            </View>
                                                            :
                                                            <Icon name={"circle"} color={"#908484"} size={18} />
                                                }
                                                {/* <Text style={{ marginHorizontal: 10, color: item?.status ? "#3AAC45" : "black" }}>Có mặt</Text> */}
                                            </View>
                                            <Text style={styles.columnNote}>{item.note}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        <Text style={{ ...styles.boldText, width: WIDTH, textAlign: "center", margin: 20 }}>Lớp học không có học viên</Text>
                }

                {
                    edittingMode &&
                    <View style={styles.buttonPack}>
                        <TouchableOpacity style={{ ...styles.buttonView }} onPress={handleClearAttend}>
                            <Text style={{ ...styles.boldText, width: "100%" }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "#241468" }} onPress={handleCompleteAttend}>
                            <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Điểm danh</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ height: 20 }} />
            </ScrollView>
            {
                (!edittingMode && studentList[0] && checkCurrentDate(date)) &&
                <TouchableOpacity style={{ ...styles.editButton, bottom: edittingMode ? HEIGHT * 0.15 : HEIGHT * 0.05 }} onPress={handleSetEditing}>
                    <Icon name={"edit"} color={"white"} size={28} />
                </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
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
    tableColumn: {
        flexDirection: "row",
        width: WIDTH,
        minHeight: 80,
        alignItems: "center",
    },
    columnNumber: {
        flexDirection: "row",
        width: "25%",
        paddingLeft: 10,
        alignItems: "center",
    },
    columnName: {
        width: "30%",
        paddingLeft: 5
    },
    columnStatus: {
        flexDirection: "row",
        width: "20%",
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    columnNote: {
        width: "25%",
        paddingLeft: 5
    },
    checkIcon: {
        padding: 2,
        borderRadius: 50,
        // marginHorizontal: 5,
        backgroundColor: "#BFE3C6",
    },
    boldText: {
        width: "20%",
        fontWeight: "600"
    },
    buttonPack: {
        flexDirection: "row",
        marginVertical: 50,
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonView: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: "#241468",
        borderRadius: 10
    },
    editButton: {
        position: "absolute",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#4582E6",
        right: WIDTH * 0.05,
        bottom: HEIGHT * 0.05
    },

    searchBar: {
        width: WIDTH * 0.8,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingRight: 25,
        borderWidth: 1,
        borderColor: "#000000",
        marginHorizontal: WIDTH * 0.1,
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        flexDirection: "row",
        alignItems: "center",
    },
    searchField: {
        width: "85%",
        paddingLeft: 10,
        marginVertical: 15,
    }
})