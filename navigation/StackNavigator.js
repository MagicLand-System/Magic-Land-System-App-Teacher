import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSelector } from '../store/selector';
import { fetchUser } from '../store/features/authSlice';
import { ActivityIndicator, View } from 'react-native';

import StartedScreen from '../screens/StartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FillInfoScreen from '../screens/FillInfoScreen';

import HomeScreen from '../screens/bottomTab/teacher/HomeScreen';
import WorkScheduleScreen from '../screens/bottomTab/teacher/WorkScheduleScreen';
import RateStudentScreen from '../screens/teacher/RateStudentScreen';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import ClassOptionScreen from '../screens/teacher/ClassOptionScreen';
import TeacherCourseSyllabus from '../screens/teacher/TeacherCourseSyllabus';
import QuizDetailScreen from '../screens/teacher/QuizDetailScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState(null)
    const user = useSelector(userSelector);
    const fetchToken = async () => {
        setLoading(true)
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                setAccessToken(accessToken)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useState(() => { fetchToken() }, [])
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUser())
        }
    }, [accessToken])
    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }

    return (
        //Screen màn hình chính
        <Stack.Navigator initialRouteName='Started'>
            {user?.role?.name === 'LECTURER' ? (
                <>
                    {/* Teacher */}
                    <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="WorkScheduleScreen" component={WorkScheduleScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RateStudentScreen" component={RateStudentScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassOptionScreen" component={ClassOptionScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TeacherCourseSyllabus" component={TeacherCourseSyllabus} options={{ headerShown: false }} />
                    <Stack.Screen name="QuizDetailScreen" component={QuizDetailScreen} options={{ headerShown: false }} />
                </>

            ) : (
                <>
                    {/* Unlogin */}
                    <Stack.Screen name="Started" component={StartedScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
                </>
            )
            }
        </Stack.Navigator >
    )
}

export default StackNavigator;