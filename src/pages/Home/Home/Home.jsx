import React, { useEffect, useState } from 'react';
import PremiumMembers from '../PremiumMembers/PremiumMembers';
import HowItWorks from '../HowItWork/HowItWorks';
import SuccessCounter from '../SuccessCountup/SuccessCounter';
import SuccessStoryCarousel from '../SuccessStory/SuccessStoryCarousel';
import AOS from "aos";
import WorkingProcess from '../workingProcess/WorkingProcess';
// import "aos/dist/aos.css"

const Home = () => {




    return (
        <div className='pt-24'>
            
            {/* banner */}
            <div
                data-aos="fade-up"
                className='bg-[url("assets/banner.png")] lg:min-w-[1150px] lg:min-h-[500px] bg-no-repeat bg-cover min-w-[300px] min-h-[230px] flex justify-center items-center rounded-xl'>
                <div>
                    <h3 className='lg:text-3xl text-2xl font-bold text-white text-center'>Matrimony Site in World</h3>
                    <p className='text-white mt-4 lg:bg-black text-center'>Join millions of singles finding meaningful relationships through shared values and beliefs</p>
                </div>
            </div>

            {/* premium members */}
            <PremiumMembers></PremiumMembers>

            {/* how to work */}
            <HowItWorks></HowItWorks>

            {/* success countup */}
            <SuccessCounter></SuccessCounter>

            <WorkingProcess></WorkingProcess>
            {/* story */}
            <SuccessStoryCarousel></SuccessStoryCarousel>

        </div>
    );
};

export default Home;