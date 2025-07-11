import React from 'react';
import PremiumMembers from '../PremiumMembers/PremiumMembers';

const Home = () => {
    return (
        <div>
            {/* banner */}
            <div className='bg-[url("assets/banner.png")] lg:min-w-[1150px] lg:min-h-[500px] bg-no-repeat bg-cover min-w-[300px] min-h-[130px] flex justify-center items-center'>
                <div>
                    <h3 className='lg:text-3xl text-2xl font-bold text-white text-center'>Matrimony Site in World</h3>
                    <p className='text-white mt-4 lg:bg-black text-center'>Join millions of singles finding meaningful relationships through shared values and beliefs</p>
                </div>
            </div>

            {/* premium members */}
            <PremiumMembers></PremiumMembers>

            Home
        </div>
    );
};

export default Home;