import axios from "axios";
// import axiosInstance from "./axiosInstance";
// const baseURL="http://192.168.0.100:8085"
// const API_ROUTES = {
//   PRODUCTENDRY: "product/create",
// };


const BASE_URL = 'http://192.168.0.100:8085';
const MASRE_TABLE_BASE_URL = 'http://192.168.0.100:8088';


export const productAddAPI = async (productUdd) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/create`, productUdd);
    return response
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};


export const productGetAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/getall`,);
    return response.data
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const productDeleteAPI = async (productId) => {
  try {
    console.log({id:productId});
    const response = await axios.post(`${BASE_URL}/product/delete`,{id:productId});
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const productUpdateAPI = async (productUpdate) => {
  try { //add id
    const response = await axios.put(`${BASE_URL}/product/update`,productUpdate);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const gstOptionsGetAPI = async () => {
  try {
    const response = await axios.get(`${MASRE_TABLE_BASE_URL}/master/taxrate/get`,);
    console.log(response)
    return response.data.responseData
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const projectCreateAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/project/create`,);
    console.log(response)
    return response.data.responseData
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};