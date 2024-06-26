import axios from "axios";
const URL = "https://magiclandapiv2.somee.com";

const instance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const authUser = async ({ phone }) => {
    const response = await instance.post("/api/v1/auth", { phone: phone });
    return response.data;
};
export const register = async (credential) => {
    const response = await instance.post("/api/v1/users/register", credential);
    return response.data;
};
export const checkExist = async ({ phone }) => {
    const response = await instance.get("/api/v1/userscheckExist", {
        params: {
            phone: phone
        }
    });
    return response.data;
};

export const getRealTime = async () => {
    try {
        const response = await instance.get('/System/GetTime');
        return response.data
    } catch (error) {
        return response?.response?.data
    }
};
