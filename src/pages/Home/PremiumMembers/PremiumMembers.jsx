import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const PremiumMembers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["premium-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premiumBiodatas");
      return res.data;
    },
  });


  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Failed to load members</div>;

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Premium Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow rounded-lg"
            >
              {/* ✅ Profile image full width */}
              <img
                src={member.photoUrl}
                alt="Profile"
                className="w-[380px] h-[380px] object-cover"
              />

              {/* ✅ Text details */}
              <div className="p-4 space-y-2">
                <p><span className="font-semibold">Biodata Type:</span> {member.biodataType}</p>
                <p><span className="font-semibold">Permanent Division:</span> {member.permanentDivision}</p>
                <p><span className="font-semibold">Occupation:</span> {member.occupation}</p>
                <p><span className="font-semibold">Date of Birth:</span> {new Date(member.dob).toLocaleDateString()}</p>
              </div>

              {/* ✅ View profile button */}
              <div className="p-4 pt-0">
                <Link
                  to={`/biodata/${member._id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
