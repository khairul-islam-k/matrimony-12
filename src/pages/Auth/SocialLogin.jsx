import React from 'react';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const {SocialLogin} = useAuth();

    const handleSocialLogin = () => {
        console.log('submit');
        SocialLogin()
        .then(result => {
            console.log(result);
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
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
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