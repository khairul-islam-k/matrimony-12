import React from 'react';

const HowItWorks = () => {
    return (
        <div className="max-w-3xl mx-auto my-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>

            <div className="space-y-4">
                <details className="border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">1. How do I create a biodata?</summary>
                    <p className="mt-2 text-gray-600">
                        You can create your biodata by registering an account and filling out the required information on the "Create Biodata" page.
                    </p>
                </details>

                <details className="border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">2. How can I contact someone?</summary>
                    <p className="mt-2 text-gray-600">
                        To contact someone, you must be a premium user. After upgrading, you can request contact information and view mobile and email details.
                    </p>
                </details>

                <details className="border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">3. What are the benefits of becoming a premium member?</summary>
                    <p className="mt-2 text-gray-600">
                        Premium members can access contact details, send requests, and get highlighted visibility to increase chances of connection.
                    </p>
                </details>

                <details className="border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">4. Is my information secure?</summary>
                    <p className="mt-2 text-gray-600">
                        Yes, we value your privacy and ensure your data is protected with encryption and secure authentication.
                    </p>
                </details>
            </div>
        </div>
    );
};

export default HowItWorks;
