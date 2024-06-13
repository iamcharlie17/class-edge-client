import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ price, id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
//   const [transactionId,setTransactionId] = useState('')
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

//   console.log(price);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => setClientSecret(res.data));
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setLoading(true);
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("ERROR", error);
      toast.error(`${error.message}`);
      setLoading(false);
      e.target.reset();
    } else {
      setLoading(false);
      toast.success("Payment proccessing");
    }

    //confirm payment--
    setIsLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log(confirmError)
      toast(`${confirmError.message}`);
      setIsLoading(false);
    } else {
      // console.log('payment intent: ', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Success");
        // setTransactionId(paymentIntent.id);
        setIsLoading(false);
        const paymentInfo = {
          email: user?.email,
          price,
          date: new Date(),
          transactionId: paymentIntent.id,
          classId: id,
          status: "pending",
        };

        console.log(paymentInfo)

        const {data} = await axiosSecure.post('/payments', paymentInfo)
        // console.log(data)
        if (data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "THANKS FOR CHOOSING US",
              text: `Transaction ID: ${paymentIntent.id}`
            });
            navigate('/dashboard/my-enroll-class')
          }
      }
    }
  }
    return (
      <div className="bg-yellow-50 rounded-sm shadow-lg p-4">
        <h1 className="text-3xl font-bold mb-12 text-center border-b pb-4">
          Payment
        </h1>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="text-center border-t pt-6 my-8">
            <button
              className="uppercase bg-[#49C3B0] font-bold w-1/2 text-white py-2 px-4 hover:scale-105 transition-transform rounded-sm"
              type="submit"
              disabled={!stripe}
            >
              {
                isLoading || loading? "Wait...": "Pay"
              }
            </button>
          </div>
        </form>
      </div>
    );
  };
export default CheckOutForm;
