import axios from "axios";
import { firebaseConfig } from "../firebase.config";

const API_VISION_URL = `https://vision.googleapis.com/v1/images:annotate`;

const apiVision = axios.create({
    baseURL: API_VISION_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const callGoogleVisionAsync = async (image) => {
    const response = await apiVision.post('', {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: 'FACE_DETECTION',
                        maxResults: 10,
                    },
                ],
            },
        ],
    }, { params: { key: firebaseConfig.apiKey } })
    return response.data;
}
