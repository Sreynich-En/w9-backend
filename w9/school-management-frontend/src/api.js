import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/auth/", // Added /auth/ to base URL
});

const token = localStorage.getItem("token");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default API;
