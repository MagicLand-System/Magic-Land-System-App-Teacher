import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export default function MainButton(props) {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
    })
    if (!fontsLoaded) {
        return null
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.btn, props.disabled && styles.disabledBtn]} disabled={props.disabled}>
            <Text style={[styles.btnText, props.disabled && styles.disabledBtnText]}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    btn: {
        width: windowWidth - 140,
        marginTop: 10,
        backgroundColor: '#F2C955',
        borderRadius: 30,
        paddingVertical: 15,
        alignSelf: 'center',
    },
    disabledBtn: {
        backgroundColor: '#f9e4aa'
    },
    disabledBtnText: {
        color: '#808080'
    },
    btnText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular'
    },
})