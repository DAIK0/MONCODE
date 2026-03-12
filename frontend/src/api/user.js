import axios from "axios";

const API = "http://localhost:3000/api";

export const updateProfileRequest = (data) =>
    axios.put(`${API}/profile`, data, {
        withCredentials: true
    });