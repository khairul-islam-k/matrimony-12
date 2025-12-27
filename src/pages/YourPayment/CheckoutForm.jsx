import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useMyDetails from '../../hooks/useMyDetails';
import Loader from '../Shared/Loader/Loader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { myBiodata, isLoading } = useMyDetails();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      setCardError(error.message);
    } else {
      setCardError('');
    }

    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents: 5 * 100,
      id
    })


    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: myBiodata?.name,
          email: myBiodata?.email
        }
      }
    })

    if (result.error) {
      setCardError(result.error.message);
      return;
    } else {
      setCardError('');
    }

    //store payment
    const payRes = await axiosSecure.post('/record-payment', {
      biodataId: id,
      email: myBiodata?.email,
      transactionId: result?.paymentIntent?.id,
      amount: 5,
      method: result?.paymentIntent?.payment_method_types[0]
    })

    if (payRes.data?.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "$5 has been payed",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/");
    }

  }



  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-base-300 p-6 rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Biodata ID</label>
        <input
          type="text"
          value={id}
          readOnly
          className="w-full border px-3 py-2 rounded text-neutral-content"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Your Email</label>
        <input
          type="email"
          value={myBiodata.email}
          readOnly
          className="w-full border px-3 py-2 rounded text-neutral-content"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Card Information</label>
        <div className="border p-3 rounded bg-white">
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

      {cardError && <p className="text-red-500">{cardError}</p>}

      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Pay $5 now
      </button>
    </form>
  );
};

export default CheckoutForm;