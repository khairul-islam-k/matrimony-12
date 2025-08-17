import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loader from '../../../Shared/Loader/Loader';

const MyContactApproval = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvals = [], isLoading } = useQuery({
    queryKey: ['myContactApprovals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contactRequests');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Approved Contact Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>              
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Biodata Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Paid At</th>
              <th className="p-3 border">User Email</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-3 border">{item.biodataName}</td>
                <td className="p-3 border">{item.biodataEmail}</td>
                <td className="p-3 border">${item.amount}</td>
                <td className="p-3 border">{new Date(item.paid_at).toLocaleString()}</td>
                <td className="p-3 border">{item.email}</td>
              </tr>
            ))}
            {approvals.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No approved contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactApproval;
