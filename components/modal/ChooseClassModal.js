import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'

import Header from '../header/Header';
import ClassCard from '../ClassCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseClassModal({ visible, classList, setClassList, setClassChoosed, onCancle, navigation }) {

    const selectCourse = (id) => {
        const index = classList.findIndex(obj => obj.classId === id);
        const updateArray = [...classList]
        const defaultStatus = updateArray[index].choose
        updateArray.forEach(item => item.choose = false)
        updateArray[index].choose = true;
        setClassList(updateArray)
        setClassChoosed(updateArray?.filter(obj => obj.choose === true))
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} goback={onCancle} title={"Vui Lòng Chọn Lịch Học"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardList}>
                    <View style={styles.srollHeader}></View>
                    {
                        classList.map((item, index) => {
                            return (
                                item.status === "UPCOMING" &&
                                <ClassCard cardDetail={item} check={true} index={index} onClick={selectCourse} key={index} />
                            )
                        })
                    }
                </ScrollView>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    cardList: {
        marginTop: 20,
        paddingHorizontal: WIDTH * 0.05
    },

    srollHeader: {
        marginBottom: 20,
    },
});