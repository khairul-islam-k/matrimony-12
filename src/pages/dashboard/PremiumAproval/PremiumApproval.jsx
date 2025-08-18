import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../Shared/Loader/Loader';

const PremiumApproval = () => {
  const axiosSecure = useAxiosSecure();

  const { data: premiumRequests = [], isLoading } = useQuery({
    queryKey: ['premiumApprovalRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/premiumApproval');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>
  };

  return (
    <div className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Premium Biodata Requests was approve</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm md:text-base">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Biodata ID</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {premiumRequests.map((bio) => (
              <tr key={bio._id} className="hover:bg-gray-50 hover:text-black">
                <td className="p-3 border">{bio.name}</td>
                <td className="p-3 border">{bio.email}</td>
                <td className="p-3 border">{bio._id}</td>
                <td className="p-3 border text-center">
                  <Link
                    to={`/biodata/${bio._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
            {premiumRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No pending premium requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumApproval;
