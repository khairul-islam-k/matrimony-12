import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loader from "../../Shared/Loader/Loader";
import "../../Shared/BorderAnimate/BorderAnimate.css";
import { motion } from "motion/react"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PremiumMembers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["premium-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premiumBiodatas");
      return res.data;
    },
  });


  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true,    // run animation only once
    });
  }, []);

  if (isLoading) {
    return <Loader></Loader>
  }
  if (isError) return <div className="text-center py-10 text-red-600">Failed to load members</div>;

  return (
    <section
      className="py-10 my-10 rounded-lg lg:rounded-2xl">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Premium Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:w-[920px] lg:mx-auto">
          {members.map((member) => (
            <motion.div
              data-aos="zoom-out"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              key={member._id} className='box mx-auto'>

              <div className={`rounded-lg shadow-black p-4 space-y-2 ${member.Biodata_Id === 'admin' && 'hidden'} bg-base-300 w-[280px] h-[380px]`}>
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-[300px] h-[200px] mx-auto object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p><strong>Biodata ID:</strong> {member.Biodata_Id}</p>
                <p><strong>Type:</strong> {member.biodataType}</p>

                <Link to={`/biodata/${member._id}`}>
                  <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                    View Profile
                  </button>
                </Link>
              </div>

            </motion.div>


          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
