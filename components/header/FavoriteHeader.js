import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import { constants } from '../../constants/constants';
import defaultAvt from "../../assets/header/defaultAvt.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function FavoriteHeader({ goback, navigation, background, title, type, setType, defaultType, editType }) {

    return (
        <View style={[styles.container, { backgroundColor: background ? background : constants.background }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    goback ? goback() : navigation?.pop();
                }}
            >
                <Icon name={"close"} color={"white"} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
                {title}
            </Text>
            <TouchableOpacity
                style={styles.chooseButton}
                onPress={setType}
            >
                {
                    type ?
                        <Text style={styles.chooseText}>
                            {defaultType ? defaultType : "Huỷ"}
                        </Text>
                        :
                        <Text style={styles.chooseText}>
                            {editType ? editType : "Chọn"}
                        </Text>
                }

            </TouchableOpacity>
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
    },
    backButton: {
        position: "absolute",
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        left: 0,
    },
    chooseButton: {
        position: "absolute",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        right: 10,
        backgroundColor: "#FFFFFF"
    },
    chooseText: {
        fontWeight: "600",
        color: "#241468"
    },
    headerTitle: {
        paddingVertical: 10,
        color: "white",
        fontWeight: "600",
        fontSize: 15,
    },
});