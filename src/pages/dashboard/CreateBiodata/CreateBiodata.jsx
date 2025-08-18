import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const CreateBiodata = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const {user} = useAuth();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  //image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0]
    //console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

    const res = await axios.post(imageUploadUrl, formData);

    const photo = res.data.data.url;
    setPhotoUrl(photo);

  }

  //Mutation for posting biodata
  const { mutateAsync: postBiodata } = useMutation({
    mutationFn: async (biodata) => {
      const res = await axiosSecure.post('/biodata', biodata);
      return res.data;
    },
  });


  const onSubmit = async (data) => {
    const biodata = {
      ...data,
      photoUrl,
      Biodata_Id: 'user',
      createdAt: new Date().toISOString() // Include date field
    };

    try {
      const result = await postBiodata(biodata);


      navigate('/dashboard')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Biodata has been submitted.",
        showConfirmButton: false,
        timer: 1500
      });

      // Optionally reset the form
       reset();

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while submitting biodata.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };


  const divisions = [
    "Dhaka",
    "Chattagram",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];

  const options = {
    height: ["4'8\"", "5'0\"", "5'4\"", "5'6\"", "5'8\"", "6'0\""],
    weight: ["45kg", "50kg", "55kg", "60kg", "65kg", "70kg+"],
    occupation: ["Student", "Engineer", "Doctor", "Business", "Teacher", "Other"],
    race: ["Fair", "Wheatish", "Dark"],
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-300 p-8 shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Create Biodata</h2>
      <p className='mb-7'>If the height and width of the image are equal, the image will be good or it will be a little problematic. Like 600*600</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Biodata Type */}
        <div>
          <label className="block font-medium mb-1">Biodata Type*</label>
          <select {...register("biodataType", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select Type</option>
            <option className='text-black' value="Male">Male</option>
            <option className='text-black' value="Female">Female</option>
          </select>
          {errors.biodataType && <p className="text-red-500 text-sm">Biodata Type is required</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name*</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border rounded px-3 py-2"
            defaultValue={user?.displayName}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-medium mb-1">Profile Image Link or Upload</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium mb-1">Date of Birth*</label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.dob && <p className="text-red-500 text-sm">Date of birth is required</p>}
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium mb-1">Height*</label>
          <select {...register("height", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select Height</option>
            {options.height.map((h, i) => (
              <option className='text-black' key={i} value={h}>{h}</option>
            ))}
          </select>
          {errors.height && <p className="text-red-500 text-sm">Height is required</p>}
        </div>

        {/* Weight */}
        <div>
          <label className="block font-medium mb-1">Weight*</label>
          <select {...register("weight", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select Weight</option>
            {options.weight.map((w, i) => (
              <option className='text-black' key={i} value={w}>{w}</option>
            ))}
          </select>
          {errors.weight && <p className="text-red-500 text-sm">Weight is required</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-medium mb-1">Occupation*</label>
          <select {...register("occupation", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select Occupation</option>
            {options.occupation.map((o, i) => (
              <option className='text-black' key={i} value={o}>{o}</option>
            ))}
          </select>
          {errors.occupation && <p className="text-red-500 text-sm">Occupation is required</p>}
        </div>

        {/* Race */}
        <div>
          <label className="block font-medium mb-1">Race (Skin Color)*</label>
          <select {...register("race", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select Skin Color</option>
            {options.race.map((r, i) => (
              <option className='text-black' key={i} value={r}>{r}</option>
            ))}
          </select>
          {errors.race && <p className="text-red-500 text-sm">Race is required</p>}
        </div>

        {/* Father & Mother Name */}
        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input type="text" {...register("fatherName")} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input type="text" {...register("motherName")} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block font-medium mb-1">Permanent Division*</label>
          <select {...register("permanentDivision", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select</option>
            {divisions.map((d, i) => (
              <option className='text-black' key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Present Division */}
        <div>
          <label className="block font-medium mb-1">Present Division*</label>
          <select {...register("presentDivision", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select</option>
            {divisions.map((d, i) => (
              <option className='text-black' key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Partner Age */}
        <div>
          <label className="block font-medium mb-1">Expected Partner Age</label>
          <input type="number" {...register("expectedPartnerAge")} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Partner Height */}
        <div>
          <label className="block font-medium mb-1">Expected Partner Height*</label>
          <select {...register("expectedPartnerHeight", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select</option>
            {options.height.map((h, i) => (
              <option className='text-black' key={i} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Partner Weight */}
        <div>
          <label className="block font-medium mb-1">Expected Partner Weight*</label>
          <select {...register("expectedPartnerWeight", { required: true })} className="w-full border rounded px-3 py-2">
            <option className='text-black' value="">Select</option>
            {options.weight.map((w, i) => (
              <option className='text-black' key={i} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium mb-1">Contact Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            {...register("email")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1">Mobile Number*</label>
          <input
            type="number"
            {...register("mobile", { required: true })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.mobile && <p className="text-red-500 text-sm">Mobile number is required</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Submit Biodata
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBiodata;
