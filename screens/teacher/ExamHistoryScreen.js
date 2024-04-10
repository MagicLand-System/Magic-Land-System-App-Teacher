import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import ChooseRateModal from '../../components/modal/ChooseRateModal';
import { saveOffLineScore, saveOnLineEvaluate } from '../../api/quiz';

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


export default function ExamHistoryScreen({ route }) {
    const navigation = useNavigation()

    const [quizData, setQuizData] = useState(route?.params?.quizData?.examInfors[0])
    const studentDetail = route?.params?.quizData
    const quizType = route?.params?.quizType
    const quizHistory = route?.params?.quizData?.examInfors[0]?.studentWorkResult
    const focusIndex = route?.params?.focusIndex
    const handleChangeStudentRate = route.params?.handleChangeStudentRate
    const [modalVisible, setModalVisible] = useState({ chooseRate: false })

    // const [quizHistory, setQuizHistory] = useState()
    const goback = () => {

        navigation.pop()
    }

    const handleChooseRate = (rate) => {
        setQuizData({ ...quizData, examStatus: rate })
        setModalVisible({ ...modalVisible, chooseRate: false })
        handleChangeStudentRate(rate, focusIndex, studentDetail?.studentId)
    }

    const getColumnColor = (item) => {
        return item?.multipleChoiceAnswerResult?.studentAnswerId === item?.multipleChoiceAnswerResult?.correctAnswerId
    }

    return (
        <>
            <Header navigation={navigation} goback={goback} title={quizData?.quizName} />
            <ScrollView style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{quizData?.quizName}</Text>
                </View>
                {
                    quizType === "multiple-choice" &&
                    <View style={styles.questionTable}>
                        <View style={styles.columnTable}>
                            <View style={styles.numberTable}>
                                <Text style={styles.boldText}>STT</Text>
                            </View>
                            <View style={styles.contentTable}>
                                <Text style={styles.boldText}>Nội dung</Text>
                            </View>
                            <View style={styles.scoreTable}>
                                <Text style={styles.boldText}>Điểm</Text>
                            </View>
                        </View>
                        {
                            quizHistory?.map((item, key) => {
                                return (
                                    <View style={styles.columnTable} key={key}>
                                        <View style={styles.numberTable}>
                                            <Text style={styles.boldText}>1</Text>
                                        </View>
                                        <View style={[styles.contentTable, styles.flexColumnBetween]}>
                                            <View width style={{ width: "80%" }}>
                                                <Text style={{ ...styles.boldText, color: getColumnColor(item) ? "#2C8535" : "#EA6D6D" }}>{item?.questionDescription}</Text>
                                                {
                                                    item?.questionImage &&
                                                    <Image
                                                        source={{ uri: item?.questionImage }}
                                                        resizeMode="cover"
                                                        style={{ width: WIDTH * 0.4, height: WIDTH * 0.4 }}
                                                    />
                                                }
                                                <View>
                                                    <Text style={{ ...styles.boldText, color: getColumnColor(item) ? "#2C8535" : "#EA6D6D" }}>Đáp Án : {item?.multipleChoiceAnswerResult?.correctAnswerDescription}</Text>

                                                    {
                                                        item?.multipleChoiceAnswerResult?.correctAnswerImage &&
                                                        <Image
                                                            source={{ uri: item?.multipleChoiceAnswerResult?.correctAnswerImage }}
                                                            resizeMode="cover"
                                                            style={{ width: WIDTH * 0.4, height: WIDTH * 0.4 }}
                                                        />
                                                    }
                                                </View>

                                            </View>


                                            {/* close-box-outline checkbox-marked-outline*/}
                                            {
                                                getColumnColor(item) ?
                                                    <Icon name={"checkbox-marked-outline"} color={"#2C8535"} size={25} />
                                                    :
                                                    <Icon name={"close-box-outline"} color={"#EA6D6D"} size={25} />
                                            }
                                        </View>
                                        <View style={styles.scoreTable}>
                                            <Text style={{ ...styles.boldText, color: getColumnColor(item) ? "#2C8535" : "#EA6D6D" }}>{item?.multipleChoiceAnswerResult?.score}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                }

                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Số câu đúng:</Text>
                    <Text style={styles.boldText}>{quizData?.correctMark} / {quizData?.totalMark}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Tổng điểm:</Text>
                    <Text style={styles.boldText}>{quizData?.scoreEarned} điểm</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Số lần làm:</Text>
                    <Text style={styles.boldText}>{quizData?.noAttemp} lần</Text>
                </View>

                <TouchableOpacity style={styles.titleView} onPress={() => setModalVisible({ ...modalVisible, chooseRate: true })}>
                    <Text style={styles.title}>Đánh giá của giáo viên: </Text>
                    {
                        rateList.find(obj => obj.eng.toLowerCase() === (quizData?.examStatus ? quizData?.examStatus : studentDetail?.note)?.toLowerCase()) ?
                            <Text >{rateList.find(obj => obj.eng.toLowerCase() === (quizData?.examStatus ? quizData?.examStatus : studentDetail?.note)?.toLowerCase())?.vn}</Text>
                            : quizData.examStatus ?
                                <Text >{quizData.examStatus}</Text>
                                :
                                <Text >Chưa đánh giá</Text>
                    }
                    {/* <Text> {rateList.find(obj => obj.eng.toLowerCase() === (quizData?.examStatus ? quizData?.examStatus : studentDetail?.note)?.toLowerCase())?.vn}</Text> */}
                </TouchableOpacity>
            </ScrollView >
            <ChooseRateModal
                visible={modalVisible.chooseRate}
                rate={quizData?.examStatus ? quizData?.examStatus : studentDetail?.note}
                onCancle={() => setModalVisible({ ...modalVisible, chooseRate: false })}
                handleChangeStudentRate={handleChooseRate}
            />
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
    questionTable: {
        width: WIDTH * 0.95,
        borderWidth: 1,
        marginHorizontal: WIDTH * 0.025
    },
    columnTable: {
        width: "100%",
        minHeight: 50,
        flexDirection: "row",
        borderWidth: 1,
    },
    numberTable: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRightWidth: 1,
    },
    contentTable: {
        width: "70%",
        justifyContent: "center",
        padding: 5,
        borderRightWidth: 1,
    },
    scoreTable: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
    },

    flexColumnCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center"
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