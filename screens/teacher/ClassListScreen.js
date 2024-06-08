import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialIcons";

import { TimeContext } from '../../context/TimeContext';
import { getClassList } from '../../api/class';
import { useFocusEffect } from '@react-navigation/native';
import ClassCartCard from '../../components/ClassCartCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassListScreen({ route, navigation }) {

    const { time } = useContext(TimeContext)

    const [classList, setClassList] = useState([])
    const [searchValue, setSearchValue] = useState("")

    useFocusEffect(
        React.useCallback(() => {
            loadClassList()
        }, [])
    );

    const loadClassList = async () => {
        const response = await getClassList()
        if (response?.status === 200) {
            setClassList(response?.data)
        }
    }

    const filterClassList = (classList) => {
        if (searchValue === "") {
            return classList
        } else {
            return classList.filter(item => item?.className?.toLowerCase().includes(searchValue?.toLowerCase()));
        }
    }

    const renderClassCard = (type, item, index) => {
        switch (type) {
            case "UPCOMING":
                return (
                    <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#C8A9F1"} key={index} />
                )
            case "PROGRESSING":
                return (
                    <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#FACE9B"} key={index} />
                )

            case "COMPLETED":
                return (
                    <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#BFE3C6"} key={index} />
                )

            default:
                return (
                    <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"white"} key={index} />
                )
        }
    }

    return (
        <>
            <Header navigation={navigation} title={"Các lớp học"} goback={navigation.pop} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Danh sách lớp Học:</Text>
                </View>
                <View style={styles.searchBar}>
                    <Icon name={"search"} color={"#908484"} size={28} />
                    <TextInput value={searchValue} onChangeText={setSearchValue} style={styles.searchField} placeholder={"Tìm kiếm Lớp học..."} placeholderTextColor="#B8B8D2" />
                </View>

                {
                    filterClassList(classList)[0] ?
                        filterClassList(classList)?.map((item, index) => {
                            return (
                                renderClassCard(item?.status, item, index)
                            )
                        })
                        :
                        <Text style={{ fontWeight: 600, textAlign: "center" }}>Không có lớp học</Text>
                }

            </ScrollView>
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
    studentAvata: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        overflow: "hidden"
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