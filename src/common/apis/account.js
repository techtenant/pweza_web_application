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



export const postRoles = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza_account}/Roles`, values);
};

export const updateRoles = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza_account}/Roles/${id}`, values);
  
};

export const deleteRoles = async (id) => {
 
  let url = `${apiRoutes.pweza_account}/Roles/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getRoles = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza_account}/Roles`;

  return await axios.get(url);
};


export const getRolesById = async (id) => {

  let url = `${apiRoutes.pweza_account}/Roles/${id}`;
  
 
  return await axios.get(url);
};
