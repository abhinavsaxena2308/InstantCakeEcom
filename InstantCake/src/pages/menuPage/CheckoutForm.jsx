import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaGooglePay } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  // Create payment intent on mount/price change
  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("❌ price is not a number or less than 1");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price })
      .then(res => {
        if (res.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
          console.log("✅ Client Secret received:", res.data.clientSecret);
        } else {
          console.error("⚠️ No clientSecret in response", res.data);
        }
      })
      .catch(err => {
        console.error("❌ Error creating payment intent:", err);
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setProcessing(true);
    setCardError("");
    setPaymentSuccess(null);

    // Get card element
    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName || "Unknown",
        email: user?.email || "Unknown",
      },
    });

    if (error) {
      console.error("[PaymentMethod Error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    console.log("[PaymentMethod Created]", paymentMethod);

    // Confirm card payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      console.error("[Confirm Payment Error]", confirmError);
      setCardError(confirmError.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("✅ Payment successful:", paymentIntent);
      setPaymentSuccess("Payment completed successfully!");
      alert(`Your TransactionID is ${paymentIntent.id}`);

      // payments info data
      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        menuItems: cart.map(item => item.menuItemId), // ✅ corrected
      };
      console.log(paymentInfo);
    }

    setProcessing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>

      {/* right side */}
      <div className="md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bf-base-100 px-4 py-8">
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="btn btn-sm mt-5 bg-green w-full text-white"
          >
            {processing ? "Processing..." : "Pay"}
          </button>
        </form>

        {cardError && <p className="text-red italic text-xs">{cardError}</p>}
        {paymentSuccess && <p className="text-green italic text-xs">{paymentSuccess}</p>}

        {/* Google Pay placeholder */}
        <div className="mt-5 text-center">
          <hr />
          <button className="btn btn-sm mt-5 bg-orange-500 text-white">
            <FaGooglePay /> Pay with Google Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
