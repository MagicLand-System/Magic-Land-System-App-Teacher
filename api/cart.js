import api from './api'

export const getCartOfParent = async () => {
    try {
        const response = await api.get("api/v1/cart/items/all");
        return response;
    } catch (error) {
        console.log("getCartOfParent in api/cart.js error : ", error);
        return error;
    }
};

export const modifyCart = async (studentIds, classId) => {

    const data = {
        StudentIdList: studentIds,
        ClassId: classId
    }

    try {
        const response = await api.post("/api/v1/cart/modify", data);
        return response;
    } catch (error) {
        console.log("modifyCart in api/cart.js error : ", error);
        return error;
    }
};

export const removeClassInCart = async (itemIdList) => {
    let path = ""
    itemIdList?.forEach(element => {
        path += "cartItemIdList=" + element + "&"
    });

    try {
        const response = await api.delete(`/api/v1/cart/item/delete?` + path);
        return response;
    } catch (error) {
        console.log("removeClassInCart in api/cart.js error : ", error);
        return error;
    }
};

export const addCourseToCart = async (courseId) => {
    try {
        const response = await api.post(`/api/v1/cart/favorite/add?courseId=` + courseId);
        return response;
    } catch (error) {
        console.log("addCourseToCart in api/cart.js error : ", error);
        return error;
    }
}
