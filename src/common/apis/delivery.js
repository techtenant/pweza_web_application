import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postDelivery = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Deliveries`, values);
};

export const updateDelivery = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza}/Deliveries/${id}`, values);
  
};


export const getDeliveries = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Deliveries`;

  return await axios.get(url);
};

export const getRiderDeliveries = async ({ queryKey }) => {
  const [, id] = queryKey;
  let url = `${apiRoutes.pweza_account}/RiderDelivery/history/${id}`;

  return await axios.get(url);
};




export const getDeliveryById = async (id) => {

  let url = `${apiRoutes.pweza}/Deliveries/${id}`;
  
 
  return await axios.get(url);
};

