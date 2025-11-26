import axios from "./axiosInstance";

export const register = (data) => axios.post("/register", data);

export const login = (data) => axios.post("/login", data);