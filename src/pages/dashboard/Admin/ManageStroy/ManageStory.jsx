import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loader from '../../../Shared/Loader/Loader';
import { IoIosStar } from "react-icons/io";
import Swal from 'sweetalert2';

const ManageStory = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: successStories = [], isLoading } = useQuery({
        queryKey: ["marriages"],
        queryFn: async () => {
            const res = await axiosSecure.get('/gotMarried');
            return res.data;
        },
    });

    const userDelete = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/gotMarried/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["marriages"]); // refresh list
        },
    })

    const handleDelete = (id) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    userDelete.mutate(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
            
        }


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Couple Image</th>
                            <th>Rating</th>
                            <th>users Id</th>
                            <th>Partner Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}

                        {
                            successStories.map((data, index) => <tr key={data._id}>
                                <th>
                                    <label>
                                        {1 + index}
                                    </label>
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={data.coupleImage} />
                                        </div>
                                    </div>

                                </td>
                                <td className='text-2xl font-bold flex items-center gap-2'>
                                    <h3>{data.rating}</h3>
                                    <IoIosStar className='text-yellow-500' />
                                </td>
                                <td>{data.userId}</td>
                                <td>{data.partnerBiodataId}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                        className="btn btn-error">Delete</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageStory;