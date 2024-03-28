import api from './api'

export const getAllAttendanceClass = async () => {
    try {
        const response = await api.get("/api/v1/lectures/current/classes");
        return response;
    } catch (error) {
        console.log("getAllAttendanceClass in api/teacher.js error : ", error);
        return error;
    }
};

export const getAttendanceList = async (classId) => {

    try {
        const response = await api.get(`/api/v1/lectures/student/attendance?classId=${classId}`);
        return response;
    } catch (error) {
        console.log("getAttendanceList in api/teacher.js error : ", error);
        return error;
    }
};

export const getAttendanceListByDate = async (classId, date) => {

    try {
        const response = await api.get(`/api/v1/lectures/class/date/attendances?classId=${classId}&date=${date}`);
        return response;
    } catch (error) {
        console.log("getAttendanceList in api/teacher.js error : ", error);
        return error;
    }
};

export const getEvaluatesList = async (classId, noSession) => {
    try {
        const response = await api.get(`/api/v1/lectures/students/get/evaluates?classId=${classId}&noSession=${noSession}`);
        return response;
    } catch (error) {
        console.log("getEvaluatesList in api/teacher.js error : ", error);
        return error;
    }
};

export const takeEvaluates = async (data, noSession) => {
    try {
        const response = await api.put(`/api/v1/lectures/students/evaluate?noSession=${noSession}`, data);
        return response;
    } catch (error) {
        console.log("takseEvaluates in api/teacher.js error : ", error);
        return error;
    }
};

export const takeAttendance = async (classId, studentList, slot) => {

    const data = {
        classId: classId,
        studentAttendanceRequests: studentList
    }

    try {
        const response = await api.put(`/api/v1/lectures/students/takeAttendance?slot=${slot}`, data);
        return response;
    } catch (error) {
        console.log("takeAttendance in api/teacher.js error : ", error);
        return error;
    }
};

export const getWorkSchedule = async () => {
    try {
        const response = await api.get("/api/v1/lectures/schedules");
        return response;
    } catch (error) {
        console.log("getWorkSchedule in api/teacher.js error : ", error);
        return error;
    }
};
