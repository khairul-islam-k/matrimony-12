import React, { useState } from 'react';
import Loader from '../../../Shared/Loader/Loader';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SuccessStoryAdmin = () => {
    const axiosSecure = useAxiosSecure();

  const { data:successStories=[], isLoading  } = useQuery({
        queryKey: ["marriages"],
        queryFn: async () => {
            const res = await axiosSecure.get('/gotMarried');
            return res.data;
        },
    });

  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStory(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Success Stories</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Male Biodata ID</th>
              <th className="p-2 border">Female Biodata ID</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {successStories.map((story, index) => (
              <tr key={story._id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{story.userId}</td>
                <td className="p-2 border">{story.partnerBiodataId}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleViewStory(story)}
                    className="px-4 py-1 rounded bg-gradient-to-r from-pink-500 to-rose-400 text-white font-medium hover:from-pink-600 hover:to-rose-500 transition cursor-pointer"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Success Story</h3>
            <img
              src={selectedStory.coupleImage}
              alt="Couple"
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-sm text-gray-500 mb-1">
              Marriage Date:{' '}
              {new Date(selectedStory.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{selectedStory.review}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStoryAdmin;
