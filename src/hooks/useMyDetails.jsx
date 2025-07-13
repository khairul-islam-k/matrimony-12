import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMyDetails = () => {
    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: myBiodata, isLoading } = useQuery({
  queryKey: ['mydetail'],
  queryFn: async () => {
    const res = await axiosSecure.get(`/mydetail/${user?.email}`);
    return res.data;
  },
});

    return {myBiodata, isLoading};
};

export default useMyDetails;