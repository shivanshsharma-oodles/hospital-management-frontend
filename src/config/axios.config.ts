import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import { env } from "./env.config";
import { storage } from "@/utils/storageFetch";

// Public Api Instance for unauthenticated requests.
const publicApi: AxiosInstance = axios.create({
  baseURL: `${env.API_URL}`, // Base URL from .env
  headers: {
    "Content-Type": "application/json", // default for normal requests
  },
});

publicApi.interceptors.request.use((config) => {
  if(config.data instanceof FormData){
    delete config.headers["Content-Type"]
  }
  return config;
})

// Private API instance for authenticated requests.
const privateApi: AxiosInstance = axios.create({
  baseURL: `${env.API_URL}`, // Protected API Route
  headers: {
    "Content-Type": "application/json", // Default header for JSON Payloads.
  },
});

// Request interceptor to inject the Authorization Header.
privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retreive Token from LS (If Not Cookies)
    const token = storage.get("authToken");

    // If token exists and headers are present, set Authorization header.
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config; // Return modified config for the request.
  },
  (error: AxiosError) => {
    // Logging Error for debugging.
    console.error("Axios Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Fetch API Responses
async function publicFetchApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const response = await fetch(
    `${env.API_URL}${endpoint}`,
    {
      ...options,
      headers: defaultHeaders,
    }
  );
  return response;
}

export {publicApi, privateApi, publicFetchApi}