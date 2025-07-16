import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useMyDetails from '../../../hooks/useMyDetails';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../Shared/Loader/Loader';

const ViewBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {myBiodata:biodata , isLoading} = useMyDetails();


  // Mutation for requesting premium
  const requestPremium = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/biodatas/premium/${id}`, { isPremium: 'pending' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['mydetail']);
      Swal.fire('Requested!', 'Your biodata is now under premium review.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to request premium.', 'error');
    },
  });

  const handleMakePremium = () => {
    if (!biodata?._id) return;
    Swal.fire({
      title: 'are you sure to make you premium?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, request',
    }).then((result) => {
      if (result.isConfirmed) {
        requestPremium.mutate(biodata._id);
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Biodata</h2>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={biodata.photoUrl}
          alt={biodata.name}
          className="w-full rounded-lg object-cover shadow"
        />
        <div className="space-y-2">
          <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
          <p><strong>Name:</strong> {biodata.name}</p>
          <p><strong>Date of Birth:</strong> {biodata.dob}</p>
          <p><strong>Height:</strong> {biodata.height}</p>
          <p><strong>Weight:</strong> {biodata.weight}</p>
          <p><strong>Age:</strong> {biodata.age}</p>
          <p><strong>Occupation:</strong> {biodata.occupation}</p>
          <p><strong>Race:</strong> {biodata.race}</p>
          <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
          <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
          <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
          <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
          <p><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
          <p><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>
          <p><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>
          <p><strong>Contact Email:</strong> {biodata.email}</p>
          <p><strong>Mobile Number:</strong> {biodata.mobile}</p>
          <p><strong>Premium Status:</strong> {biodata.isPremium || 'Not requested'}</p>
        </div>
      </div>

      {biodata.isPremium !== 'pending' && (
        <div className="text-center mt-6">
          <button
            onClick={handleMakePremium}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded cursor-pointer"
          >
            Make Biodata Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewBiodata;
