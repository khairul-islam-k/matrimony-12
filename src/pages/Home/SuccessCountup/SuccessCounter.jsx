import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaUserTie, FaUserNurse, FaHeart, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Shared/Loader/Loader';

const SuccessCounter = ({ marriages = 0 }) => {
    const axiosSecure = useAxiosSecure();
    const [boysCount, setBoysCount] = useState(0);
    const [girlsCount, setGirlsCount] = useState(0);

    const { data: biodata = {}, isLoading } = useQuery({
        queryKey: ["biodata"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });


    useEffect(() => {
    if (Array.isArray(biodata)) {
        const boys = biodata.filter(data =>  data.biodataType === 'Male');
        setBoysCount(boys.length);
    }

    if (Array.isArray(biodata)) {
        const girls = biodata.filter(data =>  data.biodataType === 'Female');
        setGirlsCount(girls.length);
    }
}, [biodata]);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className="bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Our Success Stats</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <FaUsers className="text-indigo-500 text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Total Biodatas</h3>
                    <p className="text-3xl font-bold text-indigo-500">
                        <CountUp end={biodata.length} duration={2} />
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <FaUserTie className="text-blue-600 text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Boys Biodata</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        <CountUp end={boysCount} duration={2} />
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <FaUserNurse className="text-pink-500 text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Girls Biodata</h3>
                    <p className="text-3xl font-bold text-pink-500">
                        <CountUp end={girlsCount} duration={2} />
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <FaHeart className="text-red-500 text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Marriages Completed</h3>
                    <p className="text-3xl font-bold text-red-500">
                        <CountUp end={marriages} duration={2.5} />
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SuccessCounter;
