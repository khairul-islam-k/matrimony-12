import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const RegistrationForm = () => {
    const {createUser} = useAuth();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Registration Data:", data);
        // Send data to your backend or API here
        createUser(data.email, data.password)
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <div className="w-full md:w-1/2 max-w-md p-8 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Photo URL */}
                <div>
                    <label className="block mb-1 font-medium">Photo URL</label>
                    <input
                        type="text"
                        {...register("photo")}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="https://example.com/photo.jpg"
                    />
                    
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="******"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>

    );
};

export default RegistrationForm;
