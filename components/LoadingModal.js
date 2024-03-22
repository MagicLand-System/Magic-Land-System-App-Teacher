import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useFonts, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function LoadingModal() {
    const [fontsLoaded] = useFonts({
        Baloo2_700Bold,
    })
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                {/* <LottieView
                    source={require('../assets/lottie/loading.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                /> */}
                <Text style={styles.text}>Vui lòng đợi trong giây lát...</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 10,
    },
    animation: {
        width: 200,
        height: 100,
        marginRight: 20,
    },
    text: {
        marginTop: 10,
        color: '#3A0CA3',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Baloo2_700Bold",
    }
});