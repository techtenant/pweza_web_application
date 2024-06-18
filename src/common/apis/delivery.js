import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postDelivery = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza}/orders/Deliveries`, values);
};

export const updateDelivery = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza}/orders/Deliveries/${id}`, values);
  
};


export const getDeliveries = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza}/orders/Deliveries`;

  return await axios.get(url);
};


export const getDeliveryById = async (id) => {

  let url = `${apiRoutes.pweza}/orders/Deliveries/${id}`;
  
 
  return await axios.get(url);
};

