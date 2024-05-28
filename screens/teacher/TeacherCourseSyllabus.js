import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import { getSyllabus } from '../../api/course';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { getQuizByClassid } from '../../api/quiz';
import { compareDates, formatDate, isDateInPast } from '../../util/util';
import SpinnerLoading from '../../components/SpinnerLoading';
import { TimeContext } from '../../context/TimeContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TeacherCourseSyllabus({ route, navigation }) {

    const user = useSelector(userSelector)
    const courseItem = route?.params?.courseDetail
    const { time } = useContext(TimeContext)
    const [courseSyllabus, setCourseSyllabus] = useState({})
    const [quizList, setQuizList] = useState([])
    const [loading, setLoading] = useState(true)
    const [tabType, setTabType] = useState("syllabus")
    const [refreshing, setRefreshing] = useState(false);
    let count = 0

    useEffect(() => {
        loadCourseSyllabus()
    }, [route?.params?.courseDetail])

    const loadCourseSyllabus = async () => {
        setLoading(true)
        const response = await getSyllabus(courseItem?.courseId, courseItem?.classId)
        console.log(courseItem?.courseId, courseItem?.classId);
        if (response?.status === 200) {
            setCourseSyllabus(response?.data)
        } else {
            console.log(response?.response?.data);
        }
        await loadQuizList()
        setLoading(false)
    }

    const loadQuizList = async () => {
        const response = await getQuizByClassid(courseItem?.classId)
        console.log(courseItem?.classId);
        if (response?.status === 200) {
            setQuizList(response?.data)
        }
    }

    const findQuizByDate = (date) => {
        return quizList.find(obj => compareDates(obj.date, date))
    }

    const handleDoExam = (exam) => {
        navigation.push("QuizDetailScreen", { quizData: exam, classInfor: courseItem })
        // navigation.push("ExamResultScreen", { classDetail: exam, date: exam?.date, quizData: exam })
    }

    const handleAttendance = (item) => {
        console.log(item);
        // navigation.push("AttendanceScreen", { classDetail: courseItem, date: item?.date, slot: item?.slotOrder })
    }

    const handleRate = (item) => {
        console.log(item);
        // navigation.push("RateStudentScreen", { classDetail: courseItem, date: item?.date, slot: item?.slotOrder })
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await loadCourseSyllabus()
        setRefreshing(false)
    };

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={courseItem?.className} />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={{ ...styles.tabItem, borderRightWidth: 2 }}
                    onPress={() => setTabType("syllabus")}
                >
                    <Text style={styles.tabTitle}>Thông tin chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.tabItem }}
                    onPress={() => setTabType("progress")}
                >
                    <Text style={styles.tabTitle}>Bài tập</Text>
                </TouchableOpacity>
            </View>
            {
                loading ?
                    <SpinnerLoading />
                    :
                    <ScrollView style={styles.container}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {
                            !loading &&
                            <>
                                {
                                    tabType === "syllabus" ?
                                        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.program}>
                                            {
                                                courseSyllabus?.syllabusInformations?.topics?.map((item, index) => {
                                                    return (
                                                        <View
                                                            style={{
                                                                ...styles.mainTab,
                                                                backgroundColor: index % 2 === 0 ? "#C2D9FF" : "white"
                                                            }}
                                                            key={index}
                                                        >
                                                            <TouchableOpacity
                                                                style={{ ...styles.flexColumnBetween, paddingVertical: 8 }}
                                                                onPress={() => {
                                                                    setCourseSyllabus(prevcourseSyllabus => {
                                                                        const updatedTopics = [...prevcourseSyllabus.syllabusInformations?.topics];
                                                                        updatedTopics[index] = { ...updatedTopics[index], expand: !updatedTopics[index].expand };
                                                                        return {
                                                                            ...prevcourseSyllabus,
                                                                            syllabusInformations: { ...prevcourseSyllabus.syllabusInformations, topics: updatedTopics }
                                                                        };
                                                                    });
                                                                }}
                                                            >
                                                                <Text style={styles.mainText}>
                                                                    <Text numberOfLines={1}>{"Chủ đề " + (index + 1) + " - " + item.topicName}  </Text>

                                                                </Text>

                                                                {
                                                                    !item.expand ?
                                                                        <Icon name={"plus"} color={"#241468"} size={25} />
                                                                        :
                                                                        <Icon name={"minus"} color={"#241468"} size={25} />
                                                                }
                                                            </TouchableOpacity>
                                                            {
                                                                (
                                                                    !item.sessions[0] ?
                                                                        item.expand === true &&
                                                                        <Text style={styles.childText}>Không có buổi học</Text>
                                                                        :
                                                                        item.sessions.map((element, key) => {
                                                                            return (
                                                                                <React.Fragment key={key}>
                                                                                    {
                                                                                        item.expand === true &&
                                                                                        <View style={{ ...styles.flexColumn }}>
                                                                                            {
                                                                                                isDateInPast(element?.date, time) ?
                                                                                                    <Icon name={"checkbox-marked-circle-outline"} color={"#888888"} size={22} />
                                                                                                    :
                                                                                                    <Icon name={"checkbox-blank-circle-outline"} color={"#888888"} size={22} />
                                                                                            }
                                                                                            <Text style={{ ...styles.childText, fontWeight: "700" }}>Buổi {element?.orderSession} ({formatDate(element?.date)})</Text>
                                                                                        </View>
                                                                                    }
                                                                                    {
                                                                                        (
                                                                                            !element.contents[0] ?
                                                                                                item.expand === true &&
                                                                                                <Text style={styles.childText}>Không có chủ đề</Text>
                                                                                                :
                                                                                                element?.contents?.map((content, key1) => {
                                                                                                    count += 1
                                                                                                    return (
                                                                                                        <React.Fragment key={key1}>
                                                                                                            {
                                                                                                                item.expand === true &&
                                                                                                                <Text style={{ ...styles.childText, marginLeft: 7, fontWeight: "400" }}>{count}. {content.content}</Text>
                                                                                                            }
                                                                                                            {
                                                                                                                item.expand === true &&
                                                                                                                content?.details?.map((detail, index) => {
                                                                                                                    return (
                                                                                                                        <Text style={{ ...styles.childText, marginLeft: 15, fontWeight: "300" }} key={index}>{count}.{index + 1} {detail}</Text>
                                                                                                                    )
                                                                                                                })
                                                                                                            }
                                                                                                        </React.Fragment>
                                                                                                    )
                                                                                                })
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        item.expand === true &&
                                                                                        <View style={{ marginLeft: 7 }}>
                                                                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { handleAttendance(element) }}>
                                                                                                <Icon name={"file-document"} color={"#241468"} size={22} />
                                                                                                <Text style={{ ...styles.childText, fontWeight: "400", marginLeft: 7, marginVertical: 7, color: "#241468" }} >Điểm danh</Text>
                                                                                            </TouchableOpacity>
                                                                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { handleRate(element) }}>
                                                                                                <Icon name={"star-circle"} color={"#241468"} size={22} />
                                                                                                <Text style={{ ...styles.childText, fontWeight: "400", marginLeft: 7, marginVertical: 7, color: "#241468" }} >Đánh giá</Text>
                                                                                            </TouchableOpacity>
                                                                                        </View>

                                                                                    }
                                                                                    {/* {
                                                                        item.expand === true && findQuizByDate(element?.date) &&
                                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: 7 }} onPress={() => { handleDoExam(findQuizByDate(element?.date)) }}>
                                                                            <Icon name={"folder"} color={"#241468"} size={22} />
                                                                            <Text style={{ ...styles.childText, fontWeight: "400", marginLeft: 7, marginVertical: 7, color: "#241468" }} >{findQuizByDate(element?.date)?.examName} ({formatDate(element?.date)})</Text>
                                                                        </TouchableOpacity>
                                                                    } */}
                                                                                </React.Fragment>
                                                                            )
                                                                        })
                                                                )
                                                            }
                                                        </View>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                        :
                                        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.program}>
                                            {
                                                quizList?.map((item, key) => {
                                                    return (
                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: 7, marginVertical: 5 }} key={key} onPress={() => { handleDoExam(item) }}>
                                                            <Icon name={"folder"} color={"#241468"} size={22} />
                                                            <Text style={{ ...styles.childText, fontWeight: "400", marginLeft: 7, marginVertical: 7, color: "#241468" }} >{item?.examName} ({formatDate(item?.date)})</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                }
                            </>
                        }
                    </ScrollView >
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    program: {
        width: WIDTH * 0.95,
        maxHeight: HEIGHT * 0.9,
        // borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.025,
        marginTop: 10,
        overflow: "hidden",
    },
    processScrollView: {
        // flexDirection: "row",
    },
    mainTab: {
        padding: 10,
        borderRadius: 10,
    },
    mainText: {
        width: "90%",
        fontWeight: "600",
        color: "#241468",
        marginBottom: 10,
    },
    childText: {
        paddingLeft: 10,
        marginBottom: 5,
    },

    tabContainer: {
        width: WIDTH * 0.9,
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 100,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    tabItem: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        paddingVertical: 10,
        borderColor: "#4582E6",
    },
    tabTitle: {
        color: "#4582E6",
        fontWeight: "700"
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
    },
    boldText: {
        fontWeight: "600",
    },
});