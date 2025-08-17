import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../Shared/Loader/Loader';

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load all pending premium requests
  const { data: pendingPremiums = [], isLoading } = useQuery({
    queryKey: ['pendingPremiums'],
    queryFn: async () => {
      const res = await axiosSecure.get('/biodatas/premium-requests');
      return res.data;
    },
  });

  // Mutation: Approve premium
  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`/biodatas/premium/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingPremiums']);
      Swal.fire('Success!', 'Biodata marked as premium.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to approve biodata.', 'error');
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Make this biodata premium?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <div className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Premium Approval Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Biodata ID</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPremiums.map((bio) => (
              <tr key={bio._id} className="hover:bg-gray-50">
                <td className="p-3 border">{bio.name}</td>
                <td className="p-3 border">{bio.email}</td>
                <td className="p-3 border">{bio._id}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleApprove(bio._id)}
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                  >
                    Make Premium
                  </button>
                </td>
              </tr>
            ))}
            {pendingPremiums.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No premium requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
