import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, RefreshControl, TextInput } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { constants } from '../constants/constants';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { removeUser } from '../store/features/authSlice';
import { useDispatch } from 'react-redux';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChangeApiLinkScreen({ route, navigation }) {
    const [linkApi, setLinkApi] = useState("https://magiclandapiv2.somee.com")
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() => {
            getLinkApi()
        }, [])
    );

    const getLinkApi = async () => {
        const url = await AsyncStorage.getItem("apiUrl");
        if (url) {
            setLinkApi(url)
        }
    }

    const inputLinkApi = async (url) => {
        setLinkApi(url)
    }

    const handleOnpress = async () => {
        await AsyncStorage.setItem("apiUrl", linkApi);
        console.log(linkApi);
        handleLogout()
    }

    const handleLogout = async () => {
        await signOut(auth)
        await AsyncStorage.removeItem('accessToken')
            .then(dispatch(removeUser()))
    }


    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Đổi đường dẫn"} />
            <View style={styles.textInput}>
                <TextInput
                    value={linkApi}
                    onChangeText={inputLinkApi}
                    style={styles.searchField}
                    placeholder={"Nhập đường dẫn"}
                // placeholderTextColor="#B8B8D2"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOnpress}>
                <Text style={styles.text}>Xác nhận</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textInput: {
        width: WIDTH,
        marginVertical: HEIGHT * 0.05
    },
    searchField: {
        width: "85%",
        paddingLeft: 10,
        marginVertical: 15,
        backgroundColor: "white",
        margin: 5,
        padding: 5,
        marginHorizontal: WIDTH * 0.075,
        fontSize: 18
    },
    button: {
        width: WIDTH * 0.4,
        backgroundColor: constants.background,
        marginHorizontal: WIDTH * 0.3,
        borderRadius: 10,
    },
    text: {
        color: "white",
        padding: 10,
        fontSize: 18,
        textAlign: "center",
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