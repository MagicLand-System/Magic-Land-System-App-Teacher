import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import defaultAvt from "../../assets/header/defaultAvt.png"
import { constants } from '../../constants/constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Header({ goback, navigation, background, title }) {

    const cartNavigate = () => {
        navigation.navigate("CartScreen")
    }

    return (
        <View style={[styles.container, { backgroundColor: background ? background : constants.background }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    goback ? goback() : navigation?.pop();
                }}
            >
                <Icon name={"arrow-back-ios"} color={"white"} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: HEIGHT * 0.03
    },
    backButton: {
        position: "absolute",
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "flex-end",
        left: 0,
    },
    headerTitle: {
        width: "80%",
        paddingVertical: 10,
        color: "white",
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center",
    },
});