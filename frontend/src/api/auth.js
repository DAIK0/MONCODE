import axios from "./axiosInstance";

export const register = user => axios.post("/register", user);

export const login = user => axios.post("/login", user);