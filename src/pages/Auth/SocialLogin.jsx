import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { SocialLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSocialLogin = () => {
   
        SocialLogin()
            .then(result => {
                navigate(location?.state || '/');

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            {/* google login */}
            <button
                onClick={handleSocialLogin}
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;