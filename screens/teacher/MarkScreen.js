import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialIcons";

import unhappyIcon from "../../../assets/rateIcon/unhapppyIcon.png"
import happyIcon from "../../../assets/rateIcon/happyIcon.png"
import ContentedIcon from "../../../assets/rateIcon/ContentedIcon.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const studentListDefault = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        note: "Học Bù"
    },
    {
        id: 2,
        name: "Nguyễn Văn B",
    },
    {
        id: 3,
        name: "Nguyễn Văn A",
    },
    {
        id: 4,
        name: "Nguyễn Văn C",
        note: "Học Bù"
    },
    {
        id: 5,
        name: "Nguyễn Văn B",
    },
    {
        id: 6,
        name: "Nguyễn Văn D",
    },
    {
        id: 7,
        name: "Nguyễn Văn A",
        note: "Học Bù"
    },
    {
        id: 8,
        name: "Nguyễn Văn D",
    },
    {
        id: 9,
        name: "Nguyễn Văn E",
    },
    {
        id: 10,
        name: "Nguyễn Văn F",
        note: "Dự thính"
    },
    {
        id: 11,
        name: "Nguyễn Văn A",
    },
]

export default function AttendanceScreen({ route, navigation }) {
    const classDetail = route.params.classDetail
    // file-multiple

    return (
        <>
            <Header navigation={navigation} title={classDetail?.title} goback={() => navigation.pop()} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Bài kiểm tra</Text>
                </View>

            </ScrollView>
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
        color: "#B8B8D2"
    }
})