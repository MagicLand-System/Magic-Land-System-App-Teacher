import api from './api'

export const getAllNotification = async () => {
    try {
        const response = await api.get("/api/v1/notification/user");
        return response;
    } catch (error) {
        console.log("getAllNotification in api/notification.js error : ", error);
        return error;
    }
};

export const readNotification = async (id) => {
    let path = ``
    id?.map((item) => {
        path += `ids=${item}&&`
    })
    try {
        const response = await api.put(`/api/v1/notification/update?${path}`);
        return response;
    } catch (error) {
        console.log("readNotification in api/notification.js error : ", error);
        return error;
    }
};