import axios from "axios";

export const createVolumeDiscount = async (payload) => {
    const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
    );

    return response;
};