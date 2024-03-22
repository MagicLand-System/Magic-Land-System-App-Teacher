import api from './api'

export const getAllClass = async () => {
    try {
        const response = await api.get("/api/v1/classes");
        return response;
    } catch (error) {
        console.log("getAllClass in api/course.js error : ", error);
        return error;
    }
};

export const getClassByClassId = async (classID) => {
    try {
        const response = await api.get(`/api/v1/classes/${classID}`);
        return response;
    } catch (error) {
        console.log("getClassByClassId in api/class.js error : ", error);
        return error;
    }
};

export const getClassByCourseId = async (courseID) => {
    try {
        const response = await api.get(`/api/v1/classes/course/${courseID}`);
        return response;
    } catch (error) {
        console.log("getClassByCourseId in api/class.js error : ", error);
        return error;
    }
};

export const getClassByCourseIdNotInCart = async (courseID) => {
    try {
        const response = await api.get(`/api/v1/classes/notInCart?courseId=${courseID}`);
        return response;
    } catch (error) {
        console.log("getClassByCourseIdNotInCart in api/class.js error : ", error);
        return error;
    }
};

export const registerClass = async (studentsIdList, classId) => {

    const data = [{
        studentIdList: studentsIdList,
        classId: classId
    }]

    // console.log(data);

    try {
        const response = await api.post(`/api/v1/users/checkout`, data);
        return response;
    } catch (error) {
        console.log("registerClass in api/class.js error : ", error);
        return error;
    }
};

export const checkStudentCanRegis = async (classId, studentIdList) => {

    let path = ""
    studentIdList?.forEach(element => {
        path += "studentIdList=" + element + "&"
    });

    try {
        const response = await api.get(`/api/v1/classes/students/checking?classId=${classId}&${path}`);
        return response;
    } catch (error) {
        console.log("checkStudentCanRegis in api/class.js error : ", error);
        return error;
    }
};
