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

/////////////////////////roles

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

//////////////////////use Management

export const postUser = async (values) => {
   
  return await axios.post(`${apiRoutes.pweza}/AdminUser/register`, values);
};

export const updateUser = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.pweza}/AdminUser/update/${id}`, values);
  
};


export const getUsers = async ({ queryKey }) => {

  let url = `${apiRoutes.pweza}/AdminUser/all`;

  return await axios.get(url);
};



