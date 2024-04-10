import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialIcons";

import { getAttendanceList, getAttendanceListByDate, getExamResult, takeAttendance } from '../../api/teacher';
import { checkCurrentDate } from '../../util/util';
import InputScoreModal from '../../components/modal/InputScoreModal';
import { saveOffLineScore, saveOnLineEvaluate } from '../../api/quiz';
import ChooseRateModal from '../../components/modal/ChooseRateModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const rateList = [
    {
        vn: "Bé có tiên bộ",
        eng: "prolapse",
    },
    {
        vn: "Xuất sắc",
        eng: "excellent",
    },
    {
        vn: "Làm tốt lắm",
        eng: "eoodjob",
    },
    {
        vn: "giỏi quá",
        eng: "verygood",
    },
    {
        vn: "Cố gắng lên nào",
        eng: "tryharder",
    },
    {
        vn: "Bé thực hiện tốt",
        eng: "doeswell",
    },
]

export default function ExamResultScreen({ route, navigation }) {

    const classDetail = route.params.classDetail
    const date = route.params.date
    const quizData = route.params.quizData
    const [studentList, setStudentList] = useState([])
    const [studentTmpList, setStudentTmpList] = useState([])
    const [focusStudentIndex, setFocusStudentIndex] = useState(0)
    const [edittingMode, setEdittingMode] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [modalVisible, setModalVisible] = useState({ editStudenInfor: false, chooseRate: false })

    useEffect(() => {
        loadStudentData()
    }, [route.params.classDetail])


    const loadStudentData = async () => {
        const response = await getExamResult({ classId: classDetail.classId, examIdList: [quizData?.examId] })
        console.log(classDetail.classId, [quizData?.examId]);
        if (response?.status === 200) {
            const data = response?.data?.map((item) => {
                return {
                    ...item,
                    score: item?.examInfors[0]?.scoreEarned ? item?.examInfors[0]?.scoreEarned : 0,
                    status: item?.examInfors[0]?.examStatus ? item?.examInfors[0]?.examStatus : "",
                };
            });
            setStudentList(data)
            setStudentTmpList(data)
        } else {

        }
    }

    const handleChangeStudentInfor = (score, note,) => {

        const updateArray = JSON.parse(JSON.stringify(studentTmpList))
        // const updateArray = [...studentList]
        if (updateArray[focusStudentIndex]) {
            updateArray[focusStudentIndex].score = score;
            updateArray[focusStudentIndex].status = note;
        }
        setStudentTmpList(updateArray)
        setModalVisible({ ...modalVisible, editStudenInfor: false })

    }

    const handleChangeStudentRate = async (note, focusIndex, studentId) => {
        const updateArray = JSON.parse(JSON.stringify(studentTmpList))
        // const updateArray = [...studentList]
        if (updateArray[focusIndex]) {
            updateArray[focusIndex].status = note;
        }
        setStudentList(updateArray)
        setModalVisible({ ...modalVisible, editStudenInfor: false, chooseRate: false })
        if (studentId) {
            const response = await saveOnLineEvaluate(studentId, quizData?.examId, note)
            console.log("saveOnLineEvaluate : ", studentId, quizData?.examId, note);
            if (response?.status === 200) {
                console.log("saveOnLineEvaluate complete");
            }
        } else {
            await handleCompleteAttend()
        }

    }

    const handleChangeStudentRate2 = async (note, focusIndex) => {
        const updateArray = JSON.parse(JSON.stringify(studentTmpList))
        // const updateArray = [...studentList]
        if (updateArray[focusIndex]) {
            updateArray[focusIndex].status = note;
        }
        setStudentList(updateArray)
        setStudentTmpList(updateArray)
        setModalVisible({ ...modalVisible, chooseRate: false })
    }

    const handleCompleteAttend = async () => {
        const response = await saveOffLineScore(classDetail?.classId, quizData?.examId, studentTmpList)
        if (response?.status === 200) {
            setStudentList(JSON.parse(JSON.stringify(studentTmpList)))
            setEdittingMode(false)
            console.log("save score successfull");
        } else {
            console.log("take score fail : ", response?.response?.data);
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

    const handlePressOnStudent = (student) => {

        const studentIndex = studentList?.findIndex(obj => obj?.studentId === student?.studentId)
        setFocusStudentIndex(studentIndex)

        if (quizData?.quizType !== "offline") {
            if (studentList[studentIndex] && studentList[studentIndex]?.examInfors[0]) {
                navigation.push("ExamHistoryScreen",
                    {
                        quizData: studentList[studentIndex],
                        quizType: quizData.quizType,
                        handleChangeStudentRate: handleChangeStudentRate,
                        focusIndex: studentIndex,
                    }
                )
            }
        } else if (edittingMode) {
            setModalVisible({ ...modalVisible, editStudenInfor: true })
        }
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
            <Header navigation={navigation} title={quizData?.quizName + " - Chấm điểm"} goback={navigation.pop} />
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
                                <Text style={styles.columnStatus}>Điểm</Text>
                                <Text style={styles.columnNote}>Đánh giá</Text>
                            </View>
                            {
                                filterByStudentName((edittingMode ? studentTmpList : studentList), searchValue).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => handlePressOnStudent(item)}
                                            style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#707070" }}
                                            key={index}>
                                            <View style={styles.columnNumber}>
                                                <Text style={{ ...styles.boldText, marginHorizontal: 5, marginRight: 2 }}>{index + 1}</Text>
                                                <Icon name={"account-circle"} color={"#908484"} size={WIDTH * 0.13} />
                                            </View>
                                            <Text style={styles.columnName}>{item?.studentName}</Text>
                                            <View style={styles.columnStatus}>
                                                {
                                                    item?.score ?
                                                        <Text style={{ textAlign: "center" }}>{item?.score}</Text>
                                                        :
                                                        item?.examInfors[index] ?
                                                            <Text style={{ textAlign: "center" }}>{item?.examInfors[0]?.scoreEarned}</Text>
                                                            :
                                                            <Text style={{ textAlign: "center" }}> 0</Text>
                                                }
                                            </View>
                                            {
                                                rateList.find(obj => obj.eng.toLowerCase() === item.status?.toLowerCase()) ?
                                                    <Text style={styles.columnNote}>{rateList.find(obj => obj.eng.toLowerCase() === item.status?.toLowerCase())?.vn}</Text>
                                                    : item.status ?
                                                        <Text style={styles.columnNote}>{item.status}</Text>
                                                        :
                                                        <Text style={styles.columnNote}>Chưa đánh giá</Text>
                                            }
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
                            <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Lưu Điểm</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ height: 20 }} />
            </ScrollView>
            {
                (!edittingMode && studentList[0] && quizData?.quizType === "offline") &&
                <TouchableOpacity style={{ ...styles.editButton, bottom: edittingMode ? HEIGHT * 0.15 : HEIGHT * 0.05 }} onPress={handleSetEditing}>
                    <Icon name={"edit"} color={"white"} size={28} />
                </TouchableOpacity>
            }
            <InputScoreModal
                visible={modalVisible?.editStudenInfor}
                student={studentTmpList[focusStudentIndex]}
                score={studentTmpList[focusStudentIndex]?.score ? studentTmpList[focusStudentIndex]?.score : studentTmpList[focusStudentIndex]?.examInfors[0] ? studentTmpList[focusStudentIndex]?.examInfors[0]?.scoreEarned : 0}
                note={studentTmpList[focusStudentIndex]?.status ? studentTmpList[focusStudentIndex]?.status : studentTmpList[focusStudentIndex]?.examStatus}
                onChooseRate={() => setModalVisible({ ...modalVisible, chooseRate: true })}
                onCancle={() => { setModalVisible({ ...modalVisible, editStudenInfor: false }) }}
                onSubmit={(score, note) => { handleChangeStudentInfor(score, note) }}
            />
            <ChooseRateModal
                visible={modalVisible.chooseRate}
                rate={studentTmpList[focusStudentIndex]?.status ? studentTmpList[focusStudentIndex]?.status : studentTmpList[focusStudentIndex]?.examStatus}
                onCancle={() => setModalVisible({ ...modalVisible, chooseRate: false })}
                handleChangeStudentRate={(rate) => handleChangeStudentRate2(rate, focusStudentIndex)}
            />
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
        textAlign: "center"
    },
    columnNote: {
        width: "20%",
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