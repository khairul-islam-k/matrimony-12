import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useMyDetails from '../../../hooks/useMyDetails';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CreateGotMarried = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);
  const {myBiodata} = useMyDetails();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const submission = {
      ...data,
      rating,
      userId: myBiodata?._id,
      createdAt: new Date().toISOString(),
    };


    try {
      const res = await axiosSecure.post('/gotMarried', submission);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Your success story has been submitted.', 'success');
        reset();
        setRating(0);
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }

  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Share Your Success Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-xl shadow-md">

        {/* Partner Biodata ID */}
        <div>
          <label className="block font-medium mb-1">Partner Biodata ID</label>
          <input
            type="text"
            {...register('partnerBiodataId', { required: true })}
            placeholder="Enter partner biodata ID"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.partnerBiodataId && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Couple Image */}
        <div>
          <label className="block font-medium mb-1">Couple Image Link</label>
          <input
            type="url"
            {...register('coupleImage', { required: true })}
            placeholder="Enter couple image URL"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.coupleImage && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Review */}
        <div>
          <label className="block font-medium mb-1">Success Story</label>
          <textarea
            {...register('review', { required: true })}
            rows="5"
            placeholder="Write your story..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
          {errors.review && <span className="text-sm text-red-500">This field is required</span>}
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rate Your Experience</label>
          <Rating
            initialRating={rating}
            emptySymbol={<FaRegStar className="text-2xl text-yellow-400" />}
            fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
            onChange={(rate) => setRating(rate)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded-md hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default CreateGotMarried;
