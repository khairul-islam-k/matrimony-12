import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loader from '../../../Shared/Loader/Loader';
import { useState } from 'react';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState([]);

    // Get all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Promote to admin
    const makeAdmin = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/admin/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire('Success!', 'User has been made Admin.', 'success');
        },
    });

    // Promote to premium
    const makePremium = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/premium/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire('Success!', 'User has been made Premium.', 'success');
        },
    });

    //const filterUser = users?.filter(user => user?.name?.toLowerCase().includes(search.toLowerCase()))
    //console.log(filterUser);

    const handleSearch = (e) => {
    
        const filterUser = users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearch(filterUser);
    }

    if (isLoading) {
        return <Loader></Loader>
    }


    return (
        <div className="overflow-x-auto max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>

            {/* search */}
            <div className="w-full max-w-sm mx-auto">
                <input
                    type="text"
                    //value={value}
                    onChange={handleSearch}
                    placeholder="search your choice"
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10"
                />
            </div>

            <table className="w-full table-auto border border-gray-300 text-left shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border text-center">Make Admin</th>
                        <th className="p-3 border text-center">Make Premium</th>
                    </tr>
                </thead>

                {
                    search.length > 0 ? <tbody>
                        {search.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border text-center">
                                    {user.Biodata_Id === 'admin' ? (
                                        <span className="text-green-600 font-semibold">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => makeAdmin.mutate(user._id)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="p-3 border text-center">
                                    {user.role === 'premium' ? (
                                        <span className="text-yellow-600 font-semibold">Premium</span>
                                    ) : (
                                        <button
                                            onClick={() => makePremium.mutate(user._id)}
                                            className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 text-sm"
                                        >
                                            Make Premium
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody> :

                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{user.name}</td>
                                    <td className="p-3 border">{user.email}</td>
                                    <td className="p-3 border text-center">
                                        {user.Biodata_Id === 'admin' ? (
                                            <span className="text-green-600 font-semibold">Admin</span>
                                        ) : (
                                            <button
                                                onClick={() => makeAdmin.mutate(user._id)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {user.role === 'premium' ? (
                                            <span className="text-yellow-600 font-semibold">Premium</span>
                                        ) : (
                                            <button
                                                onClick={() => makePremium.mutate(user._id)}
                                                className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 text-sm"
                                            >
                                                Make Premium
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>


                }

            </table>
        </div>
    );
};

export default ManageUser;
