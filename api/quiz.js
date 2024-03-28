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
