import React from 'react';
import Partner from "../../../assets/partner.png";
import taste from "../../../assets/Descus.png";
import date from "../../../assets/Date.png";

const WorkingProcess = () => {
    const works = [
        {
            id: 1,
            title: "Choose your partner",
            image: Partner,
            description: "Matrimony Bangladesh has an intuitive and user-friendly interface that makes navigating and finding the prospective bride and groom easy."
        },
        {
            id: 2,
            title: "Compare your taste",
            image: taste,
            description: "Our matrimony BD site offers detailed profiles of potential matches, including their age, family, education level, and other important information"
        },
        {
            id: 3,
            title: "Enjoy your date",
            image: date,
            description: "With so many prospective partners to choose from, you can be sure to find someone compatible with you in every way."
        }
    ];
    return (
        <div className='mt-12'>
            <h3 className="text-3xl font-bold text-center mb-10">OUR WORKING PROCESS</h3>
            

            <section
            data-aos="zoom-out"
            className='flex gap-20 flex-col md:flex-row md:justify-between'>
                {works.map(work => <div 
                className='text-center'
                key={work.id}>
                    <img className='w-[200px] h-[200px] rounded-full mx-auto' src={work.image} alt="" srcset="" />
                    <h4 className='text-2xl font-semibold my-3'>{work.title}</h4>
                    <p>{work.description}</p>
                </div>)}
            </section>
        </div>
    );
};

export default WorkingProcess;