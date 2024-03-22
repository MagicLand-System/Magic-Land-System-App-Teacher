import axios from "axios";
const URL = process.env.EXPO_PUBLIC_API_LINK;

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