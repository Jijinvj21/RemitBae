import axiosInstance from "./axiosInstance";

const API_ROUTES = {
  LOGIN: "login route after base url",
 
};

export const loginUserAPI = async (loginData) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.LOGIN, loginData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };