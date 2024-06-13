import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATWAY_PK)

const Payment = ({price, id}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm price={price} id={id}/>
    </Elements>
  );
};

export default Payment;
