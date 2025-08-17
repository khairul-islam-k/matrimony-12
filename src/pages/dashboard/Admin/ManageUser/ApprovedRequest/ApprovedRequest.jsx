import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Loader from '../../../../Shared/Loader/Loader';

const ApprovedRequest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all contact requests (pending + approved)
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['contactRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contactRequests/pending');
            return res.data;
        },
    });

    // Mutation to approve request
    const approveRequest = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/contactRequests/${id}/approve`),
        onSuccess: () => {
            queryClient.invalidateQueries(['contactRequests']);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The contact request has been approved.",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: () => {
            Swal.fire('Error', 'Failed to approve request.', 'error');
        },
    });

    const handleApprove = (id) => {
        Swal.fire({
            title: 'Approve Contact Request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Approve',
        }).then((result) => {
            if (result.isConfirmed) {
                approveRequest.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Contact Requests</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Biodata ID</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            

                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="p-3 border">{req.biodataName}</td>
                                <td className="p-3 border">{req.biodataEmail}</td>
                                <td className="p-3 border">{req.biodataId}</td>
                                <td className="p-3 border">
                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${req.status === 'approved'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-3 border text-center">
                                    {req.status === 'pending' && (
                                        <button
                                            onClick={() => handleApprove(req._id)}
                                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                                        >
                                            Approve Request
                                        </button>
                                    )}
                                    {req.status === 'approved' && (
                                        <span className="text-green-600 font-medium">Approved</span>
                                    )}
                                </td>
                            </tr>


                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
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

export default ApprovedRequest;
