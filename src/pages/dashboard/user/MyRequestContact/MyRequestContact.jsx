import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loader from '../../../Shared/Loader/Loader';

const MyRequestContact = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const {user} = useAuth();

    // Get my requests
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['myContactRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contactRequests?email=${user?.email}`);
            return res.data;
        },
    });

    // Delete mutation
    const deleteRequest = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/contactRequests/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['myContactRequests']);
            Swal.fire('Deleted!', 'Contact request has been deleted.', 'success');
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to delete request.', 'error');
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this request!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest.mutate(id);
            }
        });
    };

    if (isLoading) {
      return <Loader></Loader>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-6 text-center">My Contact Requests</h2>

  <div className="overflow-auto">
    <table className="min-w-full border text-sm md:text-base">
      <thead className="bg-gray-100 text-black">
        <tr>
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Biodata ID</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Mobile</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req._id} className="hover:bg-gray-50 hover:text-black">
            <td className="p-3 border">{req.biodataName}</td>
            <td className="p-3 border">{req.biodataId}</td>
            <td className="p-3 border">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  req.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {req.status}
              </span>
            </td>
            <td className="p-3 border">{req.status === 'approved' ? req.biodataMobile : '—'}</td>
            <td className="p-3 border">{req.status === 'approved' ? req.biodataEmail : '—'}</td>
            <td className="p-3 border text-center">
              <button
                onClick={() => handleDelete(req._id)}
                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {requests.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              No contact requests found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    );
};



export default MyRequestContact;