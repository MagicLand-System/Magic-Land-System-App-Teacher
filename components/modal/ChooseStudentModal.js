import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'

import Header from '../header/Header';
import { studentSelector } from '../../store/selector';
import { useSelector } from 'react-redux';
import StudentCard from '../StudentCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseStudentModal({ visible, focusCourse, selectStudent, onCancle, navigation, student}) {

    // const student = useSelector(studentSelector)

    const chooseStudent = (student) => {
        selectStudent(focusCourse, student)
    }

    const checkIdExist = (id) => {
        return focusCourse?.student?.some(item => item.student === id);
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <TouchableOpacity style={styles.safeArea} onPress={onCancle}/>
            <View style={styles.container}>
                <Header navigation={navigation} goback={onCancle} title={"Học sinh đăng ký lớp"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardList}>
                    <View style={styles.srollHeader}></View>
                    {
                        student.map((item, index) => {
                            return (
                                <StudentCard student={item} check={checkIdExist(item.id)} index={index} onClick={chooseStudent} key={index} />
                            )
                        })
                    }
                </ScrollView>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        height: HEIGHT * 0.24,
        zIndex: 15,
    },
    container: {
        height: HEIGHT * 0.76,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        zIndex: 11
    },
    cardList: {
        marginTop: 20,
        paddingHorizontal: WIDTH * 0.05,
    },

    srollHeader: {
        marginBottom: 20,
    },
});