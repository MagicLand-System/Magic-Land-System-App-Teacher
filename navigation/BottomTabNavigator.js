import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';

import ProfileScreen from '../screens/bottomTab/ProfileScreen';
import ScanScreen from '../screens/bottomTab/ScanScreen';
import HomeScreen from '../screens/bottomTab/teacher/HomeScreen';
import WorkScheduleScreen from '../screens/bottomTab/teacher/WorkScheduleScreen';
import RateStudentScreen from '../screens/teacher/RateStudentScreen';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import ClassOptionScreen from '../screens/teacher/ClassOptionScreen';
import TeacherCourseSyllabus from '../screens/teacher/TeacherCourseSyllabus';
import QuizDetailScreen from '../screens/teacher/QuizDetailScreen';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { constants } from '../constants/constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const activeColor = "#FFC90C"
    const inactiveColor = "#FFFFFF"
    const user = useSelector(userSelector);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabNavigator,
                tabBarInactiveTintColor: inactiveColor,
                tabBarActiveTintColor: activeColor,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"home-minus"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: 'Trang Chủ',
                }} />
            <Tab.Screen name="Schedule"
                component={WorkScheduleScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"calendar-month"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: user?.role?.name === 'LECTURER' ? 'Lịch Làm Việc' : 'Lịch học',
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    return <Icon name={"account"} color={focused ? activeColor : inactiveColor} size={28} />
                },
                tabBarLabel: 'Tài Khoản',
            }} />
            <Tab.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassOptionScreen" component={ClassOptionScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="TeacherCourseSyllabus" component={TeacherCourseSyllabus} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="QuizDetailScreen" component={QuizDetailScreen} options={{ tabBarButton: () => null }} />


        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
    tabNavigator: {
        paddingTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: constants.background
    }
});

