import api from './api'

export const getQuizByCourseid = async (id) => {
    try {
        const response = await api.get(`/api/v1/exams/quizzes/course?id=${id}`);
        return response;
    } catch (error) {
        console.log("getQuizByCourseid in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const getQuizByClassid = async (id, studentId) => {

    const path = studentId ? `id=${id}&studentId=${studentId}` : `id=${id}`

    try {
        const response = await api.get(`/api/v1/exams/class?${path}`);
        return response;
    } catch (error) {
        console.log("getQuizByClassid in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const getQuizById = async (id, examPart) => {
    try {
        const response = await api.get(`/api/v1/exam/quiz?id=${id}&examPart=${examPart}`);
        return response;
    } catch (error) {
        console.log("getQuizById in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const saveMultipleChoiceScore = async (ClassId, ExamId, answerList) => {
    try {
        const response = await api.post(`/api/v1/exam/quiz/multipleChoice/grade?ClassId=${ClassId}&ExamId=${ExamId}`, answerList);
        return response;
    } catch (error) {
        console.log("saveMultipleChoiceScore in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const saveOffLineScore = async (ClassId, ExamId, studentList) => {
    try {
        const response = await api.post(`/api/v1/exam/quiz/offLine/grade?ClassId=${ClassId}&ExamId=${ExamId}`, studentList);
        return response;
    } catch (error) {
        console.log("saveOffLineScore in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const saveOnLineEvaluate = async (studentId, examId, status) => {
    try {
        const response = await api.post(`/api/v1/exam/quiz/onLine/evaluate?studentId=${studentId}&examId=${examId}&status=${status}`);
        return response;
    } catch (error) {
        console.log("saveOnLineEvaluate in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};