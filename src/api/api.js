import axios from "axios";

const API_URL = "http://localhost:3001/songs";

export const getSongs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addSong = async (newSong) => {
    const response = await axios.post(API_URL, newSong);
    return response.data;
};

export const updateSongStatus = async (id, status) => {
    const response = await axios.patch(`${API_URL}/${id}`, { status });
    return response.data;
};