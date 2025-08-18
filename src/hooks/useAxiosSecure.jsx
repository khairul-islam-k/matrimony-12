import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';


const axiosInstance = axios.create({
    baseURL: 'https://matrimony-platform-server-three.vercel.app'
})

const useAxiosSecure = () => {
  const {user} = useAuth();

  if (user) {
    axiosInstance.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  })
  }

  return axiosInstance;
};

export default useAxiosSecure;