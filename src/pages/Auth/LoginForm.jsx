import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Registration Data:", data);
        // Send data to your backend or API here
    };

    return (
        <div className="w-full md:w-1/2 max-w-md p-8 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

                <p>Forget Password?</p>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>

                {/* google login */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                <p>Don’t have any account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;