import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from 'sweetalert2';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Your message is sended!",
            icon: "success",
            draggable: true
        });
    }

    useEffect(() => {
        AOS.init({
            duration: 800, // animation duration
            once: true,    // run animation only once
        });
    }, []);
    return (
        <div className="min-h-screen  flex items-center justify-center pt-12 ">
            <div className="rounded-2xl grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">

                {/* LEFT SIDE - INFO */}
                <div
                    data-aos="zoom-out-right"
                    className="p-8 rounded-l-2xl">
                    <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                    <p className="mb-4">
                        If you need any help, feel free to send us a message. We are always here to support you.
                    </p>

                    <div className="space-y-3">
                        <p><strong>📍 Address:</strong> Dhaka, Bangladesh</p>
                        <p><strong>📞 Phone:</strong> +880 1234-567890</p>
                        <p><strong>📧 Email:</strong> support@example.com</p>
                        <p><strong>⏰ Hours:</strong> 9:00 AM – 6:00 PM</p>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div
                    data-aos="zoom-out-left"
                    className="p-8 bg-base-300 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="input input-bordered w-full"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full h-32"
                            required
                        ></textarea>

                        <button className="btn btn-primary w-full">Send Message</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;