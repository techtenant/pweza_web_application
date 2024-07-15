import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postBikes = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Bikes`, values);
};

export const updateBikes = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Bikes/${id}`, values);
  
};

export const deleteBikes = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/Bikes/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getBikes = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Bikes`;

  return await axios.get(url);
};


export const getBikesById = async (id) => {

  let url = `${apiRoutes.pweza_account}/Bikes/${id}`;
  
 
  return await axios.get(url);
};

