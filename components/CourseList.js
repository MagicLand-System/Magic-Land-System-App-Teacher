import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import courseImageDefault from "../assets/courses/courseImageDefault.png"

import { truncateString } from '../util/util';

const WIDTH = Dimensions.get('window').width;

// const courseList = [
//     {
//         name: "Khóa học Toán Tư Duy (Nâng cao)",
//         regex: "Từ 3 tuổi",
//         img: courseImageDefault,
//         regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
//         introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
//         sale: 30,
//         courseFeture: [
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//         ],
//         courseDetail: [
//             {
//                 name: "Tên KH",
//                 detail: "Toán Tư Duy Cho Bé"
//             },
//             {
//                 name: "Điều kiện tham gia",
//                 detail: "Đã hoàn thành khóa học Math001"
//             },
//             {
//                 name: "Độ tuổi",
//                 detail: "Từ 7 tuổi"
//             },
//             {
//                 name: "Loại Hình",
//                 detail: "Tiếng Anh"
//             },
//             {
//                 name: "Hình Thức",
//                 detail: "Lớp học"
//             },
//             {
//                 name: "Số buổi",
//                 detail: "4 buổi / khóa"
//             },
//         ],
//     },
//     {
//         name: "Khóa học Kỹ Năng Sống ",
//         regex: "Từ 11 tuổi",
//         img: courseImageDefault,
//         regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
//         introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
//         sale: 0,
//         courseFeture: [
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//         ],
//         courseDetail: [
//             {
//                 name: "Tên KH",
//                 detail: "Toán Tư Duy Cho Bé"
//             },
//             {
//                 name: "Điều kiện tham gia",
//                 detail: "Đã hoàn thành khóa học Math001"
//             },
//             {
//                 name: "Độ tuổi",
//                 detail: "Từ 7 tuổi"
//             },
//             {
//                 name: "Loại Hình",
//                 detail: "Tiếng Anh"
//             },
//             {
//                 name: "Hình Thức",
//                 detail: "Lớp học"
//             },
//             {
//                 name: "Số buổi",
//                 detail: "4 buổi / khóa"
//             },
//         ],
//     },
//     {
//         name: "Khóa học Toán Tư Duy",
//         regex: "Từ 18 tuổi",
//         img: courseImageDefault,
//         regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
//         introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
//         sale: 99,
//         courseFeture: [
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//         ],
//         courseDetail: [
//             {
//                 name: "Tên KH",
//                 detail: "Toán Tư Duy Cho Bé"
//             },
//             {
//                 name: "Điều kiện tham gia",
//                 detail: "Đã hoàn thành khóa học Math001"
//             },
//             {
//                 name: "Độ tuổi",
//                 detail: "Từ 7 tuổi"
//             },
//             {
//                 name: "Loại Hình",
//                 detail: "Tiếng Anh"
//             },
//             {
//                 name: "Hình Thức",
//                 detail: "Lớp học"
//             },
//             {
//                 name: "Số buổi",
//                 detail: "4 buổi / khóa"
//             },
//         ],
//     },
//     {
//         name: "Khóa học Toán Tư Duy",
//         regex: "Từ 18 tuổi",
//         img: courseImageDefault,
//         regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
//         introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
//         sale: 30,
//         courseFeture: [
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//         ],
//         courseDetail: [
//             {
//                 name: "Tên KH",
//                 detail: "Toán Tư Duy Cho Bé"
//             },
//             {
//                 name: "Điều kiện tham gia",
//                 detail: "Đã hoàn thành khóa học Math001"
//             },
//             {
//                 name: "Độ tuổi",
//                 detail: "Từ 7 tuổi"
//             },
//             {
//                 name: "Loại Hình",
//                 detail: "Tiếng Anh"
//             },
//             {
//                 name: "Hình Thức",
//                 detail: "Lớp học"
//             },
//             {
//                 name: "Số buổi",
//                 detail: "4 buổi / khóa"
//             },
//         ],
//     },
//     {
//         name: "Khóa học Toán Tư Duy",
//         regex: "Từ 18 tuổi",
//         img: courseImageDefault,
//         regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
//         introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
//         sale: 45,
//         courseFeture: [
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//             {
//                 name: "Phát trển tư duy và kỹ năng",
//                 detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
//             },
//         ],
//         courseDetail: [
//             {
//                 name: "Tên KH",
//                 detail: "Toán Tư Duy Cho Bé"
//             },
//             {
//                 name: "Điều kiện tham gia",
//                 detail: "Đã hoàn thành khóa học Math001"
//             },
//             {
//                 name: "Độ tuổi",
//                 detail: "Từ 7 tuổi"
//             },
//             {
//                 name: "Loại Hình",
//                 detail: "Tiếng Anh"
//             },
//             {
//                 name: "Hình Thức",
//                 detail: "Lớp học"
//             },
//             {
//                 name: "Số buổi",
//                 detail: "4 buổi / khóa"
//             },
//         ],
//     },
// ]

export default function CourseList({ type, size, navigation }) {

    const hanldeNavigate = (course) => {
        navigation.navigate("CourseDetailScreen", course = { course })
    }

    function sliceArray(array, size) {
        if (size) {
            return array.slice(0, size)
        } else {
            return array
        }
    }

    const SaleMaker = ({ sale }) => {
        return (
            <View style={styles.frame}>
                <View style={styles.frameTop} />
                <View style={styles.frameCenter}>
                    <Text style={styles.frameText}>SALE</Text>
                    <Text style={styles.frameText}>{sale ? sale : 0}%</Text>
                </View>
                <View style={styles.frameBottom}>
                    <View style={styles.frameBottomLeft} />
                    <View style={styles.frameBottomRight} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {sliceArray(courseList, size).map((item, key) => {
                return (
                    <View key={key}>
                        <TouchableOpacity style={styles.cardView} onPress={() => { hanldeNavigate(item) }}>
                            {
                                item?.sale != 0 &&
                                <SaleMaker sale={item?.sale} />
                            }
                            <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                            <View style={styles.cardDetail} >
                                <Text style={styles.cardName}>{truncateString(item.name, 23)}</Text>
                                <View style={styles.regex}>
                                    <Icon name={"person"} color={"#B8B8D2"} size={20} />
                                    <Text style={styles.regexValue}>{item.regex}</Text>
                                </View>
                                {
                                    type != "new" ?
                                        <View style={styles.flexColumnBetween}>
                                            {
                                                type == "sell" ?
                                                    <View style={{ ...styles.flexColumn, padding: 5, backgroundColor: "#C71212" }}>
                                                        <Text style={{ ...styles.tabText, color: "white", fontWeight: "600" }}>
                                                            Best Seller
                                                        </Text>
                                                    </View>
                                                    :
                                                    ""
                                            }
                                            <View style={styles.flexColumn}>
                                                <Icon name={"star"} color={"#F4A120"} size={20} />
                                                <Text style={{ ...styles.tabText, color: "#F4A120" }}>
                                                    4.6
                                                </Text>
                                            </View>
                                            <View style={styles.flexColumn}>
                                                <Icon name={"person"} color={"#3A0CA3"} size={20} />
                                                <Text style={{ ...styles.tabText, color: "#3A0CA3" }}>
                                                    8 người đăng ký
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        ""
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })}
            <View style={styles.bottom} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: WIDTH * 0.05,
        marginBottom: 10,
    },
    cardView: {
        position: "relative",
        width: WIDTH * 0.9,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    courseImage: {
        width: WIDTH * 0.28,
        height: WIDTH * 0.20,
        borderRadius: 10,
    },
    cardDetail: {
        position: "relative",
        marginLeft: WIDTH * 0.05,
    },
    cardName: {
        fontWeight: "600",
        fontSize: 15
    },
    regex: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    regexValue: {
        color: "#B8B8D2"
    },
    bottom: {
        height: WIDTH * 0.3
    },
    flexColumnBetween: {
        position: "absolute",
        width: WIDTH * 0.52,
        bottom: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        marginRight: 5,
    },
    tabText: {
        fontSize: 10,
    },
    frame: {
        position: "absolute",
        width: 28,
        height: "50%",
        top: 0,
        right: 10,
    },
    frameTop: {
        width: "100%",
        height: "100%",
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: "#F4A120",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    frameCenter: {
        position: "absolute",
        width: "100%",
        height: "85%",
        justifyContent: "center",
        alignItems: "center"
    },
    frameText: {
        fontSize: 7,
        fontWeight: "600",
        color: "#F4A120"
    },
    frameBottom: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: "20%",
    },
    frameBottomLeft: {
        position: "absolute",
        width: "59%",
        height: "100%",
        borderBottomWidth: 2,
        borderColor: "#F4A120",
        transform: [{ rotateZ: '-30deg' }, { translateY: -3.75 }]
    },
    frameBottomRight: {
        position: "absolute",
        width: "59%",
        height: "100%",
        right: 0,
        borderBottomWidth: 2,
        borderColor: "#F4A120",
        transform: [{ rotateZ: '30deg' }, { translateY: -3.75 }]
    },
});