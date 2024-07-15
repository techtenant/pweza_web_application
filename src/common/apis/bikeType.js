import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postBikeTypes = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/BikeTypes`, values);
};

export const updateBikeTypes = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/BikeTypes/${id}`, values);
  
};

export const deleteBikeTypes = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/BikeTypes/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getBikeTypes = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/BikeTypes`;

  return await axios.get(url);
};


export const getBikeTypesById = async (id) => {

  let url = `${apiRoutes.pweza_account}/BikeTypes/${id}`;
  
 
  return await axios.get(url);
};

