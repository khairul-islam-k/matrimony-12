import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Biodatas = () => {
    const axiosSecure = useAxiosSecure();
    const [biodatas, setBiodatas] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [ageRange, setAgeRange] = useState([18, 40]);
    const [typeFilter, setTypeFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');

    // Fetch all biodatas
    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setBiodatas(res.data);
                setFiltered(res.data);
            });
    }, []);

    // Filter logic
    useEffect(() => {
        const result = biodatas.filter(b => {
            const ageMatch = +b.age >= ageRange[0] && +b.age <= ageRange[1];
            const typeMatch = typeFilter ? b.biodataType === typeFilter : true;
            const divisionMatch = divisionFilter ? b.permanentDivision === divisionFilter : true;
            return ageMatch && typeMatch && divisionMatch;
        });
        setFiltered(result);
    }, [ageRange, typeFilter, divisionFilter, biodatas]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 py-10">
            {/* Filter Panel */}
            <div className="lg:w-1/4 w-full space-y-4 border rounded-lg p-4 shadow-sm h-fit">
                <h2 className="text-xl font-bold mb-2">Filter Biodatas</h2>

                {/* Age Filter */}
                <div>
                    <label className="font-semibold">Age Range</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="number"
                            className="border p-1 rounded w-1/2"
                            value={ageRange[0]}
                            onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
                            min={18}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            className="border p-1 rounded w-1/2"
                            value={ageRange[1]}
                            onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
                            max={60}
                        />
                    </div>
                </div>

                {/* Biodata Type */}
                <div>
                    <label className="font-semibold">Biodata Type</label>
                    <select
                        className="w-full border p-2 rounded mt-1"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Division Filter */}
                <div>
                    <label className="font-semibold">Permanent Division</label>
                    <select
                        className="w-full border p-2 rounded mt-1"
                        value={divisionFilter}
                        onChange={(e) => setDivisionFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagra">Chattagra</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>

            {/* Biodata Cards Section */}
            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((biodata) => (
                    <div key={biodata._id} className="border rounded-lg shadow-sm p-4 space-y-2">
                        <img
                            src={biodata.photoUrl}
                            alt={biodata.name}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="text-lg font-semibold">{biodata.name}</h3>
                        <p><strong>Biodata ID:</strong> {biodata.Biodata_Id}</p>
                        <p><strong>Type:</strong> {biodata.biodataType}</p>
                        <p><strong>Division:</strong> {biodata.permanentDivision}</p>
                        <p><strong>Age:</strong> {biodata.age}</p>
                        <p><strong>Occupation:</strong> {biodata.occupation}</p>
                        <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            View Profile
                        </button>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center">No biodatas found with selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default Biodatas;
