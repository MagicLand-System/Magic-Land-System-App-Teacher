import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import CustomToast from "../../components/CustomToast";
import { getQuizByClassid, getQuizHistory } from '../../api/quiz';
import SpinnerLoading from '../../components/SpinnerLoading';
import { formatDate, formatTime } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function QuizDetailScreen({ route, navigation }) {

    const classInfor = route?.params?.classInfor
    const [quizData, setQuizData] = useState(route?.params?.quizData)
    const [loading, setLoading] = useState(true)
    const [expandStatus, setExpandStatus] = useState({ cog: false })
    const showToast = CustomToast();

    useFocusEffect(
        React.useCallback(() => {
            loadQuizList()
        }, [])
    );

    const loadQuizList = async () => {
        setLoading(true)
        const response = await getQuizByClassid(classInfor?.classId)
        // console.log(courseItem?.classOpeningInfors[0]?.classId, user?.studentIdAccount);
        if (response?.status === 200) {
            setQuizData(response?.data?.find(obj => obj?.examId === route?.params?.quizData?.examId))
        }
        setLoading(false)
    }

    const getQuizType = (type) => {
        switch (type) {
            case "flashcard":
                return "Lật thẻ"

            case "multiple-choice":
                return "Trắc nghiệm"

            case "options":
                return "Khác"

            default:
                return "Khác"
        }
    }

    const hanldeSetupQuiz = () => {
        console.log("comming soon");
    }

    const hanldeScoreEditNavigate = () => {
        console.log("comming soon");
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={quizData?.quizName} />
            {
                loading ?
                    <SpinnerLoading />
                    :
                    <ScrollView style={styles.container}>
                        <View style={styles.flexColumnCenter}>
                            <Text style={{ ...styles.boldText, color: "#3D5CFF", fontSize: 22, marginVertical: 20 }}>{quizData?.examName}</Text>
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity
                                style={{ ...styles.flexColumnBetween, padding: 5, paddingVertical: 15 }}
                                onPress={() => { setExpandStatus({ ...expandStatus, cog: !expandStatus.cog }) }}
                            >
                                <View style={styles.flexColumn} >
                                    <Icon name={"cog"} color={"#241468"} size={25} />
                                    <Text style={{ ...styles.boldText, color: "#241468", marginLeft: 5 }}>Cài đặt:</Text>
                                </View>
                                {
                                    expandStatus?.cog ?
                                        <Icon name={"minus"} color={"#241468"} size={25} />
                                        :
                                        <Icon name={"plus"} color={"#241468"} size={25} />
                                }
                            </TouchableOpacity>
                            {
                                expandStatus?.cog &&
                                <View style={{ marginLeft: 7 }}>
                                    <Text style={{ ...styles.boldText, color: "#241468" }}>1. Thời gian:</Text>
                                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                                        <Text style={{ ...styles.boldText, color: "#241468", marginLeft: 5 }}>Thời gian bắt đầu:</Text>
                                        <Text style={{ ...styles.boldText, color: "#241468" }}>{formatTime(quizData?.examStartTime) + " - " + formatDate(quizData?.examStartTime)}</Text>
                                    </View>
                                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                                        <Text style={{ ...styles.boldText, color: "#241468", marginLeft: 5 }}>Thời gian bắt đầu:</Text>
                                        <Text style={{ ...styles.boldText, color: "#241468" }}>{formatTime(quizData?.examEndTime) + " - " + formatDate(quizData?.examEndTime)}</Text>
                                    </View>
                                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                                        <Text style={{ ...styles.boldText, color: "#241468", marginLeft: 5 }}>Thời gian bắt đầu:</Text>
                                        <Text style={{ ...styles.boldText, color: "#241468" }}>{quizData?.duration / 60}p</Text>
                                    </View>
                                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10, marginBottom: 30 }}>
                                        <Text style={{ ...styles.boldText, color: "#241468" }}>2. Số lần làm:</Text>
                                        <Text style={{ ...styles.boldText, color: "#241468" }}>{quizData?.attemptAlloweds}</Text>
                                    </View>
                                </View>
                            }
                            <View style={{ borderBottomWidth: 2, borderColor: "#241468" }} />
                            <TouchableOpacity style={{ ...styles.flexColumn, padding: 5, paddingVertical: 15 }}
                                onPress={() => { hanldeScoreEditNavigate() }}
                            >
                                <Icon name={"file-document"} color={"#241468"} size={25} />
                                <Text style={{ ...styles.boldText, color: "#241468", marginLeft: 5 }}>Điểm:</Text>
                            </TouchableOpacity>
                        </View>


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
    content: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1
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
    flexColumnAround: {
        flexDirection: "row",
        justifyContent: "space-around",
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