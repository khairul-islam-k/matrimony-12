import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loader from "../../Shared/Loader/Loader";

const PremiumMembers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["premium-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premiumBiodatas");
      return res.data;
    },
  });


  if (isLoading) {
    return <Loader></Loader>
  }
  if (isError) return <div className="text-center py-10 text-red-600">Failed to load members</div>;

  return (
    <section className="py-10 bg-base-200 my-10 rounded-lg lg:rounded-2xl">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Premium Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:w-3/4 lg:mx-auto">
          {members.map((member) => (
            <div key={member._id} className={`border rounded-lg shadow-sm p-4 space-y-2 ${member.Biodata_Id === 'admin' && 'hidden'}`}>
                            <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="w-full h-[200px] lg:h-1/2 object-cover rounded"
                            />
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p><strong>Biodata ID:</strong> {member.Biodata_Id}</p>
                            <p><strong>Type:</strong> {member.biodataType}</p>
                            <p><strong>Division:</strong> {member.permanentDivision}</p>
                            <p><strong>Age:</strong> {member.age}</p>
                            <p><strong>Occupation:</strong> {member.occupation}</p>
                            <Link to={`/biodata/${member._id}`}>
                                <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                                    View Profile
                                </button>
                            </Link>
                        </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
