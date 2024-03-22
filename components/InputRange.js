import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native'
import React from "react";

import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const WIDTH = Dimensions.get('window').width;
const KONBSIZE = 20;
const MAXWIDTH = WIDTH * 0.8 - KONBSIZE / 2 + 6

export default function InputRange({ min, max, minValue, maxValue, steps, title, onValueChange }) {

    // const xKnob1 = useSharedValue(Math.round((minValue / (max - min)) * MAXWIDTH));Math.round((value - min) * MAXWIDTH / (max - min))
    const xKnob1 = useSharedValue(Math.round((minValue - min) * MAXWIDTH / (max - min)))
    const scaleKnob1 = useSharedValue(1)
    const xKnob2 = useSharedValue(Math.round((maxValue - min) * MAXWIDTH / (max - min)))
    const scaleKnob2 = useSharedValue(1)

    const gestureHandler1 = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = xKnob1.value
        },
        onActive: (event, ctx) => {
            scaleKnob1.value = 1.3
            xKnob1.value = ctx.startX + event.translationX < 0
                ? 0
                : ctx.startX + event.translationX > xKnob2.value
                    ? xKnob2.value
                    : ctx.startX + event.translationX
        },
        onEnd: () => {
            scaleKnob1.value = 1;
            runOnJS(onValueChange)({
                min: Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) * steps,
                max: Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) * steps
            })
        },
    })

    const gestureHandler2 = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = xKnob2.value
        },
        onActive: (event, ctx) => {
            scaleKnob2.value = 1.3
            xKnob2.value = ctx.startX + event.translationX < xKnob1.value
                ? xKnob1.value
                : ctx.startX + event.translationX > MAXWIDTH
                    ? MAXWIDTH
                    : ctx.startX + event.translationX
        },
        onEnd: () => {
            scaleKnob2.value = 1;
            runOnJS(onValueChange)({
                min: Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) * steps,
                max: Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) * steps
            })
        },
    })

    const styleLine = useAnimatedStyle(() => {
        return {
            backgroundColor: "#4582E6",
            height: 3,
            marginTop: -3,
            borderRadius: 3,
            width: xKnob2.value - xKnob1.value,
            transform: [{ translateX: xKnob1.value }],
        }
    })

    const styleKnob1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: xKnob1.value,
                },
                {
                    scale: scaleKnob1.value
                }
            ]
        }
    })

    const styleKnob2 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: xKnob2.value,
                },
                {
                    scale: scaleKnob2.value
                }
            ]
        }
    })

    const propsLabel1 = useAnimatedProps(() => {
        return {
            text: `${Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) * steps}`,
        }
    })

    const propsLabel2 = useAnimatedProps(() => {
        return {
            text: `${Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) * steps}`,
        }
    })

    return (
        <GestureHandlerRootView>
            <View style={styles.rangeContainer}>
                <View style={styles.labelContainer}>
                    <AnimatedTextInput defaultValue={`${minValue}`} editable={false} style={styles.label} animatedProps={propsLabel1} />
                    <AnimatedTextInput defaultValue={`${maxValue}`} editable={false} style={styles.label} animatedProps={propsLabel2} />
                </View>
                <View style={styles.track} />
                <Animated.View style={styleLine} />
                <View>
                    <PanGestureHandler onGestureEvent={gestureHandler1}>
                        <Animated.View style={[styles.knob, styleKnob1]} />
                    </PanGestureHandler>
                    <PanGestureHandler onGestureEvent={gestureHandler2}>
                        <Animated.View style={[styles.knob, styleKnob2]} />
                    </PanGestureHandler>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    rangeContainer: {
        padding: 20,
    },
    labelContainer: {
        width: WIDTH * 0.8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    label: {
        // color: "#3D5CFF",
        fontSize: 12,
    },
    track: {
        height: 3,
        width: MAXWIDTH,
        backgroundColor: "#B8B8D2",
        borderRadius: 3,
    },
    knob: {
        position: "absolute",
        height: KONBSIZE,
        width: KONBSIZE,
        borderRadius: KONBSIZE / 2,
        borderColor: "#4582E6",
        borderWidth: 2,
        backgroundColor: "#fff",
        marginTop: -KONBSIZE + 8,
        marginLeft: -8,

    }
});