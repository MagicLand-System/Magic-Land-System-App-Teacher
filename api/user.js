import api from './api'

export const getCurrentUser = async () => {
    const response = await api.get("/api/v1/users/getcurrentuser");
    return response.data;
};

export const updateUserData = async ({ user, fullName, dateOfBirth, gender, avatarImage, email, address }) => {

    const data = {
        fullName: fullName ? fullName : user?.fullName,
        dateOfBirth: dateOfBirth ? dateOfBirth : user?.dateOfBirth,
        gender: gender ? gender : user?.gender,
        avatarImage: avatarImage ? avatarImage : user?.avatarImage,
        email: email ? email : user?.email,
        address: address ? address : user?.address
    }

    try {
        const response = await api.put("/api/v1/users/update");
        return response;
    } catch (error) {
        console.log("updateUserData in api/user.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};