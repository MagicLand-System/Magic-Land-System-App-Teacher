import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import { getSyllabus } from '../../api/course';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { getQuizByClassid } from '../../api/quiz';
import { compareDates, formatDate } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TeacherCourseSyllabus({ route, navigation }) {

    const user = useSelector(userSelector)
    const courseDetail = route?.params?.courseDetail?.courseDetail
    const courseItem = route?.params?.courseDetail
    const [courseSyllabus, setCourseSyllabus] = useState({})
    const [quizList, setQuizList] = useState([])
    const [loading, setLoading] = useState(true)
    let count = 0

    useEffect(() => {
        setLoading(true)
        loadCourseSyllabus()
        setLoading(false)
    }, [route?.params?.courseDetail])

    const loadCourseSyllabus = async () => {
        const response = await getSyllabus(courseItem?.courseId, courseItem?.classOpeningInfors[0]?.classId)
        if (response?.status === 200) {
            setCourseSyllabus(response?.data)
        }
        await loadQuizList()
    }

    const loadQuizList = async () => {
        const response = await getQuizByClassid(courseItem?.classOpeningInfors[0]?.classId, user?.studentIdAccount)
        if (response?.status === 200) {
            setQuizList(response?.data)
        }
    }

    const mergeData = (quizData) => {
        const mergedData = addExamsToSessions(courseSyllabus?.syllabusInformations, quizData)
        console.log(mergedData?.topics[mergedData.topics.length - 1]);
    }

    const findQuizByDate = (date) => {
        return quizList.find(obj => compareDates(obj.date, date))
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={courseDetail?.courseName} />
            <ScrollView style={styles.container}>
                <ScrollView nestedScrollEnabled={true} style={styles.program}>
                    {
                        !loading &&
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
                                                                <Text style={{ ...styles.childText, fontWeight: "700" }}>Buổi {element?.orderSession} ({formatDate(element?.date)})</Text>
                                                            }
                                                            {
                                                                (
                                                                    !element.contents[0] ?
                                                                        item.expand === true &&
                                                                        <Text style={styles.childText}>Không có chủ đề</Text>
                                                                        :
                                                                        element?.contents?.map((content, key) => {
                                                                            count += 1
                                                                            return (
                                                                                <React.Fragment key={key}>
                                                                                    {
                                                                                        item.expand === true &&
                                                                                        <Text style={{ ...styles.childText, marginLeft: 7, fontWeight: "400" }} key={key}>{count}. {content.content}</Text>
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
                                                                item.expand === true && findQuizByDate(element?.date) &&
                                                                <>
                                                                    <Text style={{ ...styles.childText, fontWeight: "400", marginLeft: 7, marginVertical: 7 }} >Bài Tập</Text>
                                                                    {
                                                                        console.log(findQuizByDate(element?.date))
                                                                    }
                                                                </>
                                                            }
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
            </ScrollView >
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