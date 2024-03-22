import { View, Text, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import MainButton from '../components/MainButton';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { useNavigation } from '@react-navigation/native';

const slides = [
    {
        image: require('./../assets/images/kid.jpg'),
        title: 'Cơ hội học tập',
        caption: 'Cung cấp cho các con những khóa học xuất sắc không chỉ giúp nâng cao kiến thức mà còn phát triển kỹ năng sống, giúp con tự tin và sẵn sàng đối mặt với thách thức.'
    },
    {
        image: require('./../assets/images/teacher.jpg'),
        title: 'Đội ngũ giáo viên',
        caption: 'Đội ngũ giáo viên ưu tú và đáng tin cậy đóng vai trò quan trọng trong quá trình giáo dục, đào tạo và phát triển của con.'
    },
    {
        image: require('./../assets/images/kid2.jpg'),
        title: 'Tiện lợi và chất lượng',
        caption: 'Hiện đại, kết hợp nhiều hình thức giảng dạy đồng thời vẫn đảm bảo chất lượng tốt nhất cho con trẻ'
    },
]

export default function StartedScreen() {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Baloo2_700Bold,
    })
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                loop
                autoplay
            >
                {slides.map((slide, index) => (
                    <View key={index}
                        style={styles.slide}
                    >
                        <View style={{ alignSelf: 'center', height: 250, marginBottom: 50 }}>
                            <Image source={slide.image} style={styles.image} />
                        </View>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.caption}>{slide.caption}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.buttonView}>
                <MainButton onPress={() => navigation.navigate('Login')} title="Đăng kí / Đăng nhập" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {},
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#3A0CA3',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        marginTop: 30,
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        color: '#3A0CA3',
        marginTop: 40,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: "Baloo2_700Bold"
    },
    caption: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 25,
        color: 'rgba(0,0,0,.5)',
        fontFamily: "Inter_400Regular",
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    }
})