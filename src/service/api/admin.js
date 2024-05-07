import axios from "axios";
// import axiosInstance from "./axiosInstance";
// const baseURL="http://192.168.0.100:8085"
// const API_ROUTES = {
//   PRODUCTENDRY: "product/create",
// };


const BASE_URL = 'http://192.168.0.122:8085';
const MASRE_TABLE_BASE_URL = 'http://192.168.0.122:8088';


export const productAddAPI = async (productAdd) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/create`, productAdd);
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

export const projectCreateAPI = async (projectAdd) => {
  try {
    const response = await axios.post(`${BASE_URL}/project/create`,projectAdd);
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const projectGetAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/project/getall`,);
    return response.data
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const countryOptionsGetAPI = async () => {
  try {
    const response = await axios.get(`${MASRE_TABLE_BASE_URL}/master/country/list`,);
    console.log(response)
    return response.data.responseData
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const workTypeOptionsGetAPI = async () => {
  try {
    const response = await axios.get(`${MASRE_TABLE_BASE_URL}/master/worktype/list`,);
    console.log(response)
    return response.data.responseData
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const clientDataGetAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/project/getclient`,);
    return response.data
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const createVoucherAPI = async (voucherAdd) => {
  try {
    const response = await axios.post(`${BASE_URL}/voucher/sales/add`,voucherAdd);
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const partyDataGetAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/party/getall`,);
    return response.data
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const createPurchaseAPI = async (purchaseAdd) => {
  try {
    const response = await axios.post(`${BASE_URL}/purchase/add`,purchaseAdd);
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};