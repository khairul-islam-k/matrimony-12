import React, { useEffect, useState } from 'react';
import PremiumMembers from '../PremiumMembers/PremiumMembers';
import HowItWorks from '../HowItWork/HowItWorks';
import SuccessCounter from '../SuccessCountup/SuccessCounter';
import SuccessStoryCarousel from '../SuccessStory/SuccessStoryCarousel';

const Home = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "light");

    const handleToggle = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector('html').setAttribute("data-theme", localTheme);
    },[theme])

    console.log(theme)
    
    return (
        <div>
            {/* theme */}
            <div className='flex justify-end p-4'>
                <div>
                    <h3>theme</h3>
                    <label className="toggle text-base-content">
                        <input onClick={handleToggle} type="checkbox" 
                        checked={theme=== "dark"? true : false} 
                        className="theme-controller" />

                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                    </label>
                </div>

            </div>
            {/* banner */}
            <div className='bg-[url("assets/banner.png")] lg:min-w-[1150px] lg:min-h-[500px] bg-no-repeat bg-cover min-w-[300px] min-h-[130px] flex justify-center items-center rounded-xl'>
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
            {/* story */}
            <SuccessStoryCarousel></SuccessStoryCarousel>

        </div>
    );
};

export default Home;