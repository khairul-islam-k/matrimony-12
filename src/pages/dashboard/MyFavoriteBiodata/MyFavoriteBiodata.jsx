import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyFavoriteBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch all favorite biodatas for this user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['myFavorites', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to delete a favorite item
  const deleteFavorite = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/favorites/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myFavorites']);
      Swal.fire('Deleted!', 'Favorite biodata removed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete favorite.', 'error');
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this biodata from favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFavorite.mutate(id);
      }
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Favorite Biodatas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Biodata ID</th>
              <th className="p-3 border">Permanent Address</th>
              <th className="p-3 border">Occupation</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => (
              <tr key={fav._id} className="hover:bg-gray-50 hover:text-black">
                <td className="p-3 border">{fav.biodataName}</td>
                <td className="p-3 border">{fav.biodataId}</td>
                <td className="p-3 border">{fav.BiodataAddress}</td>
                <td className="p-3 border">{fav.occupation}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {favorites.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  You have no favorite biodatas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavoriteBiodata;
