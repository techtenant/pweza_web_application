import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postOrders = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Orders`, values);
};

export const updateOrder = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Orders/${id}`, values);
  
};

export const deleteOrder = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/Orders/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getOrders = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Orders`;

  return await axios.get(url);
};


export const getOrderById = async (id) => {

  let url = `${apiRoutes.pweza_account}/Orders/${id}`;
  
 
  return await axios.get(url);
};

export const getOrderByUserId = async  ({ queryKey }) => {
  const [, id] = queryKey;
  let url = `${apiRoutes.pweza_account}/Orders/user/${id}`;
  
 
  return await axios.get(url);
};

