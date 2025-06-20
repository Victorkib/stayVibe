import { useState } from "react";

const PaystackCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Sample booking/reservation data - replace with your actual data
  const bookingDetails = {
    amount: 50000, // Amount in Kes (500.00 kes)
    email: "customer@example.com",
    name: "John Doe",
    phone: "08012345678",
    reference: `booking_${Date.now()}`, // Generate unique reference
  };

  const handlePaystackPayment = () => {
    setIsLoading(true);
    setPaymentStatus("");

    // Load Paystack script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      const handler = window.PaystackPop.setup({
        key: '', // Replace with your Paystack public key
        email: bookingDetails.email,
        amount: bookingDetails.amount, // Amount in kobo
        currency: 'KES',
        ref: bookingDetails.reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: bookingDetails.name
            },
            {
              display_name: "Phone Number", 
              variable_name: "phone_number",
              value: bookingDetails.phone
            }
          ]
        },
        callback: function(response) {
          setIsLoading(false);
          setPaymentStatus("success");
          console.log('Payment successful:', response);
          
          // Here you would typically:
          // 1. Verify the payment on your backend
          // 2. Update your database
          // 3. Send confirmation email
          // 4. Redirect user to success page
          
          alert(`Payment successful! Reference: ${response.reference}`);
        },
        onClose: function() {
          setIsLoading(false);
          setPaymentStatus("cancelled");
          console.log('Payment cancelled');
        }
      });
      
      handler.openIframe();
    };
    
    script.onerror = () => {
      setIsLoading(false);
      setPaymentStatus("error");
      alert('Failed to load payment gateway');
    };
    
    document.head.appendChild(script);
  };

  return (
    <div className="max-w-md mx-auto ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Reservation</h2>
        
        {/* Booking Summary */}
        {/* <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Booking Details</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span>{bookingDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{bookingDetails.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span>{bookingDetails.phone}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Amount:</span>
              <span>₦{(bookingDetails.amount / 100).toLocaleString()}</span>
            </div>
          </div>
        </div> */}

        {/* Payment Status */}
        {paymentStatus && (
          <div className={`p-3 rounded-lg mb-4 ${
            paymentStatus === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : paymentStatus === 'cancelled'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {paymentStatus === 'success' && '✅ Payment completed successfully!'}
            {paymentStatus === 'cancelled' && '⚠️ Payment was cancelled'}
            {paymentStatus === 'error' && '❌ Payment failed. Please try again.'}
          </div>
        )}
      </div>

      {/* Reserve Button */}
      <button
        onClick={handlePaystackPayment}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          'Reserve Now'
        )}
      </button>

      {/* Security Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Secured by Paystack • Your payment information is safe
        </p>
      </div>
    </div>
  );
};

export default PaystackCheckout;