import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';

import { auth } from '../firebase/firebase.init';
async function getFreshToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken(true); 
  return token;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken(true); // ✅ fresh token
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor); // ✅ clean up
    };
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;