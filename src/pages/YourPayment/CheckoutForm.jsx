import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useParams } from 'react-router';
import useMyDetails from '../../hooks/useMyDetails';
import Loader from '../Shared/Loader/Loader';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
    const {id} = useParams();
    const {myBiodata, isLoading} = useMyDetails();
    console.log(myBiodata);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error)
        } else {
            console.log(paymentMethod)
        }

        const res = await axiosSecure.post('/create-payment-intent',{
          amountInCents : 5*100,
          id
        })

        console.log(res.data);
        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret,{
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details:{
              name: 'customer name'
            }
          }
        })

        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log('success', result);
        }
        

    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Biodata ID</label>
        <input
          type="text"
          value={id}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Your Email</label>
        <input
          type="email"
          value={myBiodata.email}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Card Information</label>
        <div className="border p-3 rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#fa755a' },
              },
            }}
          />
        </div>
      </div>

      {/* {cardError && <p className="text-red-500">{cardError}</p>} */}

      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Pay Now
      </button>
    </form>
    );
};

export default CheckoutForm;