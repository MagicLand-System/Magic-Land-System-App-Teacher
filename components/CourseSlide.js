import { View, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

import musicCourse from "../assets/courses/music.png"
import paintCourse from "../assets/courses/paint.png"
import mathCourse from "../assets/courses/math.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const courseList = [
    {
        img: musicCourse,
        navigate: "",
    },
    {
        img: paintCourse,
        navigate: "",
    },
    {
        img: mathCourse,
        navigate: "",
    },
    {
        img: mathCourse,
        navigate: "",
    },
]

export default function CourseSlide() {


    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
            {courseList.map((item, key) => {
                return (
                    <View style={styles.courseView} key={key}>
                        <TouchableOpacity>
                            <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                        </TouchableOpacity>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: WIDTH * 0.05
    },
    courseView: {
        width: WIDTH * 0.4,
        marginRight: WIDTH * 0.1
    },
    courseImage: {
        width: "100%"
    }
});