import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postPackages = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza}/pwezaPackages`, values);
};

export const updatePackages = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza}/pwezaPackages/${id}`, values);
  
};

export const deletePackages = async (id) => {
 
  let url = `${apiRoutes.pweza}/pwezaPackages/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getPackages = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza}/pwezaPackages`;

  return await axios.get(url);
};


export const getPackagesById = async (id) => {

  let url = `${apiRoutes.pweza}/pwezaPackages/${id}`;
  
 
  return await axios.get(url);
};

