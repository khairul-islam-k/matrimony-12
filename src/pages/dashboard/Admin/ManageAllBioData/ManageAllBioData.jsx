import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../../Shared/Loader/Loader';
import Swal from 'sweetalert2';

const ManageAllBioData = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: members = [], isLoading } = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })

    const userDelete = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/user/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]); // refresh list
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
        <div className='px-4 py-10'>
            <h3 className="text-2xl font-bold text-center mb-6">Manage All bioData</h3>
            
            <section className='flex justify-center'>
                <div className='grid lg:grid-cols-3 gap-4'>
                {
                    members.map(member => <div
                        key={member._id}
                        className="card bg-base-100 w-[300px] shadow-sm border border-gray-400">
                        <figure>
                            <img
                                src={member.photoUrl} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{member.name}</h2>
                            <p>Height : {member.height} ft</p>
                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handleDelete(member._id)}
                                    className="btn btn-error">Delete Now</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            </section>

        </div>
    );
};

export default ManageAllBioData;