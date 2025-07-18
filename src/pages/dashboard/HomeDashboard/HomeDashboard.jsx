import React, { useEffect, useState } from 'react';
import useMyDetails from '../../../hooks/useMyDetails';
import Loader from '../../Shared/Loader/Loader';
import Chart from './Chart';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const HomeDashboard = () => {
    const { myBiodata, isLoading } = useMyDetails();
    const axiosSecure = useAxiosSecure();
    const [boysCount, setBoysCount] = useState(0);
    const [girlsCount, setGirlsCount] = useState(0);
    const [premiumCount, setPremiumCount] = useState(0);

    const { data: biodata = [] } = useQuery({
        queryKey: ["biodata"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const biodataCount = [
        { name: "TotalBiodata", value: biodata.length },
        { name: "Boys", value: boysCount },
        { name: "girls", value: girlsCount },
        { name: "premium", value: premiumCount }
    ];

    useEffect(() => {
        if (Array.isArray(biodata)) {
            const boys = biodata.filter(data => data.biodataType === 'Male');
            setBoysCount(boys.length);
        }

        if (Array.isArray(biodata)) {
            const girls = biodata.filter(data => data.biodataType === 'Female');
            setGirlsCount(girls.length);
        }

        if (Array.isArray(biodata)) {
            const premium = biodata.filter(data => data.Biodata_Id === 'premium');
            setPremiumCount(premium.length);
        }
    }, [biodata]);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h3 className='text-center lg:text-4xl font-bold text-2xl'>Welcome to {myBiodata.Biodata_Id} {myBiodata.name} </h3>

            {/* chart */}
            {
                myBiodata?.Biodata_Id ==='admin' && <Chart
                    biodataCount={biodataCount}
                ></Chart>
            }

        </div>
    );
};

export default HomeDashboard;