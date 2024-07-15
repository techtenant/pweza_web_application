import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postProduct = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Products`, values);
};

export const updateProduct = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Products/${id}`, values);
  
};

export const deleteProducts = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/Products/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getProducts = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Products`;

  return await axios.get(url);
};


export const getProductById = async (id) => {

  let url = `${apiRoutes.pweza_account}/Products/${id}`;
  
 
  return await axios.get(url);
};

