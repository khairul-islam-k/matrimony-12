import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Story.css';

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Loader from '../../Shared/Loader/Loader';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

// const successStories = [
//     {
//         _id: '68790082b83183c80b3a3490',
//         partnerBiodataId: '687111a64effe1420c4dc4d',
//         coupleImage: 'https://i.ibb.co/v4CJPLTm/couple-5.png',
//         review:
//             'From strangers to life partners—all thanks to this platform. Our families are overjoyed. We’re now building a beautiful life together.',
//         rating: 3,
//         userId: '6874c94113ef805706863f34',
//         createdAt: '2025-07-17T13:54:10.859Z',
//     },
//     // Add more story objects here...
// ];

const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
        if (i < rating) {
            return <FaStar key={i} className="text-yellow-400" />;
        }
        return <FaRegStar key={i} className="text-gray-300" />;
    });
};

const SuccessStoryCarousel = () => {
    const axiosSecure = useAxiosSecure();

    const { data: successStories=[], isLoading } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axiosSecure.get('/gotMarried');
            return res.data;
        },
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="my-10 px-4 md:px-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Success Stories</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                centeredSlides={true}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                navigation
                pagination={{ clickable: true }}
                className="max-w-screen-xl mx-auto"
            >
                {successStories.map((story) => (
                    <SwiperSlide key={story._id}>
                        <div className="bg-base-300 shadow-lg rounded-2xl p-5 h-full flex flex-col justify-between text-center">
                            <img
                                src={story.coupleImage || '/default-couple.png'}
                                alt="Couple"
                                className=" mx-auto mb-4 border-4 border-pink-200"
                            />
                            <p className="text-sm mb-2">
                                Married on {new Date(story.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex justify-center mb-2">{renderStars(story.rating)}</div>
                            <p className="text-sm">{story.review}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SuccessStoryCarousel;
