import { privateApi, publicApi } from "@/config/axios.config";
import type { AuthUserResponse, LoginPayload, LoginResponse, SignupPayload, SignupResponse } from "@/types/api.types";
import { storage } from "@/utils/storageFetch";

export const signup = async (
    payload: SignupPayload
) : Promise<SignupResponse> => {
    const response = await publicApi.post('/auth/signup', payload);
    
    return response.data;
}

export const login = async (
    payload: LoginPayload
) :  Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/login', payload);

    storage.set('authToken', response.data.jwt);
    return response.data;
}

export const adminLogin = async (
    payload: LoginPayload
) :  Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/admin/login', payload);

    storage.set('authToken', response.data.jwt);
    return response.data;
}

export const getAuthMe = async (): Promise<AuthUserResponse> => {
  const res = await privateApi.get("/auth/me");
  return res.data;
};