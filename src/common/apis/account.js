import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postSignup = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Users/register`, values);
};

export const postLogin = async (values) => {
   
    return await axios.post(`${apiRoutes.pweza_account}/Users/login`, values);
};

export const getUsersProfile = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Users/profile`;

  return await axios.get(url);
};

export const updateProfile = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Users/profile`, values);
  
};