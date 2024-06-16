import axios from "axios";
import { AUTH_TOKEN, USER } from "@/static";
import { jwtDecode } from "jwt-decode";

console.log("windows_host", window.location.hostname);
const host = window.location.hostname;
let hostUrl = "/api/v1";

switch (host) {
  case "localhost":
    hostUrl = "http://localhost:4000".concat(hostUrl);
    break;
  default:
    break;
}

export const API_BASE_URL = hostUrl;

const removeAuth = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER);
  window.location.href = "/login";
};

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 60000,
});

// Intercept all requests
client.interceptors.request.use(
  (config) => {
    console.log(`${config.method?.toUpperCase()} - ${config.url}:`);

    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && currentTime > decodedToken.exp) {
        removeAuth();
        return Promise.reject("Session expired. Please login again.");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept all responses
client.interceptors.response.use(
  async (response) => {
    console.log(`${response.status} - ${response.config.url}:`);
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      removeAuth();
      return null;
    } else if (
      (status >= 400 && status < 500) ||
      (status >= 500 && status < 600)
    ) {
      return Promise.reject({
        message: error.response?.data.message,
        data: { message: error.response?.data.message },
      });
    } else if (status === 500) {
      // TODO: Ask Ugo why expired token returns 500 instead of 401
      //   removeAuth()
      throw new Response("Internal Server Error", { status: 404 });
    }

    if (error?.message === "Network Error") {
      return Promise.reject({
        message: "Something went wrong! Please try again.",
        data: {
          message: "Please check your internet connection and try again.",
        },
      });
    }

    return Promise.reject(error);
  }
);

export default async (needsAuth = true) => {
  if (needsAuth) {
    client.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
      AUTH_TOKEN
    )}`;
  }
  return client;
};
