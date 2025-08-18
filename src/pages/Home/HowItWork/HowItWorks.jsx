import React from 'react';

const HowItWorks = () => {
    return (
        <div className="my-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>

            <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">1. How do I create a biodata?</div>
                <div className="collapse-content text-sm">You can create your biodata by registering an account and then you have to go to create account on the dashboard and create biodata.</div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">2. How can I contact someone?</div>
                <div className="collapse-content text-sm">To contact someone, you must be a premium user. After upgrading, you can request contact information and view mobile and email details.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">3. What are the benefits of becoming a premium member?</div>
                <div className="collapse-content text-sm">Premium members can access contact details, send requests, and get highlighted visibility to increase chances of connection.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">4. Is my information secure?</div>
                <div className="collapse-content text-sm">Yes, we value your privacy and ensure your data is protected with encryption and secure authentication.</div>
            </div>

        </div>
    );
};

export default HowItWorks;
