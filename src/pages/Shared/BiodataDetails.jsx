import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyDetails from "../../hooks/useMyDetails";
import Loader from "./Loader/Loader";

const BiodataDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { myBiodata } = useMyDetails();
    //console.log(user?.Biodata_Id);

    const { data: biodata = {}, isLoading, isError, isPending } = useQuery({
        queryKey: ["biodata", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/${id}`);
            return res.data;
        },
    });



    // Second query: Similar biodata — only fetch if `biodataType` is known
    const { data: similar = [] } = useQuery({
        queryKey: ["similar", biodata?.biodataType, biodata?._id],
        enabled: !!biodata._id, // ✅ Wait until biodata is loaded
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/similarBiodatas/${biodata.biodataType}/${biodata._id}`
            );
            return res.data;
        },
    });


    if (isLoading) {
        return <Loader></Loader>
    }
    if (isError) return <div className="text-center py-10 text-red-600">Failed to load biodata</div>;



    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Full Image */}
            <img
                src={biodata.photoUrl}
                alt={biodata.name}
                className="rounded-lg mb-6 shadow"
            />

            {/* Info Grid */}
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">{biodata.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                <p><span className="font-semibold">Biodata Type:</span> {biodata.biodataType}</p>
                <p><span className="font-semibold">Date of Birth:</span> {new Date(biodata.dob).toLocaleDateString()}</p>
                <p><span className="font-semibold">Height:</span> {biodata.height}</p>
                <p><span className="font-semibold">Weight:</span> {biodata.weight}</p>
                <p><span className="font-semibold">Age:</span> {biodata.age}</p>
                <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
                <p><span className="font-semibold">Skin Tone:</span> {biodata.race}</p>
                <p><span className="font-semibold">Father's Name:</span> {biodata.fatherName}</p>
                <p><span className="font-semibold">Mother's Name:</span> {biodata.motherName}</p>
                <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
                <p><span className="font-semibold">Present Division:</span> {biodata.presentDivision}</p>
                <p><span className="font-semibold">User Role:</span> <span className='text-red-500 font-bold'>{biodata.Biodata_Id}</span></p>

                {
                    myBiodata && <div>
                        {
                            myBiodata?.Biodata_Id === 'user' ?
                                <>
                                    <Link to={`/payment/${biodata._id}`}><button
                                        className="inline-block mt-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer mr-3"
                                    >Contact Information</button>
                                    </Link>
                                    <button
                                        className="inline-block mt-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                                    >Add to Favourites</button>
                                </> :
                                <>
                                    <p><span className="font-semibold">Email:</span> {biodata.email}</p>
                                    <p><span className="font-semibold">Mobile:</span> {biodata.mobile}</p>
                                </>
                        }
                    </div>
                }


            </div>

            {/* Expected Partner */}
            <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-500">Expected Partner Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p><span className="font-semibold">Expected Age:</span> {biodata.expectedPartnerAge}</p>
                <p><span className="font-semibold">Expected Height:</span> {biodata.expectedPartnerHeight}</p>
                <p><span className="font-semibold">Expected Weight:</span> {biodata.expectedPartnerWeight}</p>
            </div>

            {/* similar card */}

            {similar.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-blue-500 mb-4">Similar {biodata.biodataType} Profiles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similar.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white shadow rounded-lg overflow-hidden"
                            >
                                <img
                                    src={item.photoUrl}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 space-y-1">
                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                    <p><span className="font-semibold">Age:</span> {item.age}</p>
                                    <p><span className="font-semibold">Occupation:</span> {item.occupation}</p>
                                    <p><span className="font-semibold">Division:</span> {item.permanentDivision}</p>
                                    <Link
                                        to={`/biodata/${item._id}`}
                                        className="inline-block mt-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}



        </div>
    );
};

export default BiodataDetails;
