import axios from "axios";

// const API = axios.create({ baseURL: "http://192.168.0.23:5000/api/v1/" });
const API = axios.create({ baseURL: "https://api-jgj6.onrender.com/api/v1" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user-token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("user-token")
    )}`;
  }
  return req;
});

// events------------
export const createNewEventApi = (data) => API.post("events/new", data);
export const getAllEventsApi = () => API.get("events");
export const updateEventApi = (data, id) => API.put(`events/${id}`, data);
export const deleteEventApi = (id) => API.delete(`events/${id}`);

// users ----------
export const getAllUsersApi = (data) => API.get("users");
export const registerUserApi = (data) => API.post("users/new", data);
export const updateUserApi = (data, id) => API.put(`users/${id}`, data);
export const deleteUserApi = (id) => API.delete(`users/${id}`);
