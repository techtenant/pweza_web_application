import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postSettings = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Settings`, values);
};

export const updateSettings = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Settings/${id}`, values);
  
};

export const deleteSettings = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/Settings/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getSettings = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Settings`;

  return await axios.get(url);
};


export const getSettingById = async (id) => {

  let url = `${apiRoutes.pweza_account}/Settings/${id}`;
  
 
  return await axios.get(url);
};

