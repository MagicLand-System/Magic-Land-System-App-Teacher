import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

export default function StarChoose({ size, setSize }) {

    const renderStar = (size) => {
        let starList = []
        for (let index = 0; index < 5; index++) {
            if (index < size) {
                starList.push(
                    <TouchableOpacity key={index} onPress={() => { setSize(index + 1) }}>
                        < Icon name={"star"} color={"#FFC90C"} size={50} />
                    </TouchableOpacity>
                )
            } else {
                starList.push(
                    <TouchableOpacity key={index} onPress={() => { setSize(index + 1) }}>
                        < Icon name={"star"} color={"#C4C4C4"} size={50} />
                    </TouchableOpacity>
                )
            }

        }
        return starList
    }

    return (
        <View style={styles.container}>
            {renderStar(size)?.map(item => { return item })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
    },
});