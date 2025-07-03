'use client';

import { useState, useEffect } from 'react';
import {
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Lock,
  DollarSign,
} from 'lucide-react';

const PAYSTACK_PUBLIC_KEY = import.meta.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
const PAYSTACK_CURRENCY = import.meta.env.NEXT_PUBLIC_PAYSTACK_CURRENCY;

const PaystackCheckout = ({
  bookingData,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel,
  disabled = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  // Validate booking data
  useEffect(() => {
    const errors = [];

    if (!bookingData?.checkIn || !bookingData?.checkOut) {
      errors.push('Please select check-in and check-out dates');
    }

    if (!bookingData?.guests || bookingData.guests < 1) {
      errors.push('Please select number of guests');
    }

    if (!bookingData?.customerInfo?.email) {
      errors.push('Email address is required');
    }

    if (
      !bookingData?.customerInfo?.firstName ||
      !bookingData?.customerInfo?.lastName
    ) {
      errors.push('Customer name is required');
    }

    if (!bookingData?.totalAmount || bookingData.totalAmount <= 0) {
      errors.push('Invalid booking amount');
    }

    // Add currency validation
    const { defaultCurrency, supportedCurrencies } = getCurrencyConfig();
    if (!supportedCurrencies[defaultCurrency]) {
      errors.push('Payment currency not configured properly');
    }

    setValidationErrors(errors);
  }, [bookingData]);

  // Calculate booking details from the provided data
  const getBookingCalculation = () => {
    if (!bookingData) return null;

    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    return {
      nights,
      baseAmount:
        bookingData.totalAmount -
        (bookingData.cleaningFee || 0) -
        (bookingData.serviceFee || 0) -
        (bookingData.taxes || 0),
      cleaningFee: bookingData.cleaningFee || 75,
      serviceFee: bookingData.serviceFee || 0,
      taxes: bookingData.taxes || 0,
      totalAmount: bookingData.totalAmount,
      pricePerNight: Math.round(
        (bookingData.totalAmount -
          (bookingData.cleaningFee || 0) -
          (bookingData.serviceFee || 0) -
          (bookingData.taxes || 0)) /
          nights
      ),
    };
  };

  const bookingCalculation = getBookingCalculation();

  // Generate unique reference
  const generateReference = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `stayvibe_${
      bookingData?.propertyId || 'prop'
    }_${timestamp}_${random}`;
  };

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Enhanced currency handling
  const getCurrencyConfig = () => {
    const supportedCurrencies = {
      NGN: { rate: 800, subunit: 100, symbol: '₦' },
      GHS: { rate: 12, subunit: 100, symbol: '₵' },
      KES: { rate: 150, subunit: 100, symbol: 'KSh' },
      ZAR: { rate: 18, subunit: 100, symbol: 'R' },
      USD: { rate: 1, subunit: 100, symbol: '$' },
    };

    const defaultCurrency = PAYSTACK_CURRENCY || 'KES';
    return { defaultCurrency, supportedCurrencies };
  };

  const convertToSubunits = (usdAmount, targetCurrency = 'KES') => {
    const { supportedCurrencies } = getCurrencyConfig();
    const currencyConfig = supportedCurrencies[targetCurrency];

    if (!currencyConfig) {
      console.error(`Currency ${targetCurrency} not supported`);
      return Math.round(usdAmount * 100);
    }

    const convertedAmount = usdAmount * currencyConfig.rate;
    return Math.round(convertedAmount * currencyConfig.subunit);
  };

  const handlePaystackPayment = () => {
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n' + validationErrors.join('\n'));
      return;
    }

    if (!bookingCalculation) {
      alert('Unable to calculate booking details. Please try again.');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('');

    const { defaultCurrency, supportedCurrencies } = getCurrencyConfig();
    const paymentCurrency = defaultCurrency;

    // Prepare customer name
    const customerName =
      `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`.trim();

    // Prepare payment data
    const paymentData = {
      amount: convertToSubunits(
        bookingCalculation.totalAmount,
        paymentCurrency
      ),
      email: bookingData.customerInfo.email,
      name: customerName,
      phone: bookingData.customerInfo.phone || '',
      reference: generateReference(),
      currency: paymentCurrency,
      propertyId: bookingData.propertyId,
      propertyTitle: bookingData.propertyTitle,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      nights: bookingCalculation.nights,
      originalAmount: bookingCalculation.totalAmount,
      exchangeRate: supportedCurrencies[paymentCurrency].rate,
      customerInfo: bookingData.customerInfo,
    };

    console.log('Payment Data:', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      originalUSD: paymentData.originalAmount,
      exchangeRate: paymentData.exchangeRate,
      customer: customerName,
    });

    // Load Paystack script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';

    script.onload = () => {
      try {
        const handler = window.PaystackPop.setup({
          key: 'pk_live_d1a1a8924ff2cd9452a4c221c8a49bfb30c697a9',
          email: paymentData.email,
          amount: paymentData.amount,
          currency: paymentData.currency,
          ref: paymentData.reference,

          // Enhanced metadata for better tracking
          metadata: {
            custom_fields: [
              {
                display_name: 'Customer Name',
                variable_name: 'customer_name',
                value: paymentData.name,
              },
              {
                display_name: 'Phone Number',
                variable_name: 'phone_number',
                value: paymentData.phone,
              },
              {
                display_name: 'Property ID',
                variable_name: 'property_id',
                value: paymentData.propertyId?.toString() || '',
              },
              {
                display_name: 'Property Title',
                variable_name: 'property_title',
                value: paymentData.propertyTitle || '',
              },
              {
                display_name: 'Check-in Date',
                variable_name: 'check_in',
                value: new Date(paymentData.checkIn)
                  .toISOString()
                  .split('T')[0],
              },
              {
                display_name: 'Check-out Date',
                variable_name: 'check_out',
                value: new Date(paymentData.checkOut)
                  .toISOString()
                  .split('T')[0],
              },
              {
                display_name: 'Number of Guests',
                variable_name: 'guests',
                value: paymentData.guests.toString(),
              },
              {
                display_name: 'Number of Nights',
                variable_name: 'nights',
                value: paymentData.nights.toString(),
              },
              {
                display_name: 'Original Amount (USD)',
                variable_name: 'original_amount_usd',
                value: paymentData.originalAmount.toString(),
              },
              {
                display_name: 'Arrival Time',
                variable_name: 'arrival_time',
                value: paymentData.customerInfo.arrivalTime || '',
              },
              {
                display_name: 'Purpose of Visit',
                variable_name: 'purpose',
                value: paymentData.customerInfo.purpose || '',
              },
              {
                display_name: 'Special Requests',
                variable_name: 'special_requests',
                value: paymentData.customerInfo.specialRequests || '',
              },
            ],
          },

          // Payment success callback
          callback: (response) => {
            setIsLoading(false);
            setPaymentStatus('success');

            console.log('Payment successful:', response);

            // Prepare comprehensive success data
            const successData = {
              paymentReference: response.reference,
              paystackReference: response.reference,
              transactionId: response.trans,
              status: response.status,
              bookingData: {
                ...paymentData,
                bookingReference: response.reference,
                bookingStatus: 'confirmed',
                paymentStatus: 'completed',
                bookingDate: new Date().toISOString(),
              },
              amount: paymentData.originalAmount,
              currency: 'USD',
              paymentCurrency: paymentData.currency,
              exchangeRate: paymentData.exchangeRate,
              paymentMethod: 'paystack',
              timestamp: new Date().toISOString(),
              customerInfo: paymentData.customerInfo,
              propertyInfo: {
                id: paymentData.propertyId,
                title: paymentData.propertyTitle,
              },
            };

            // Call parent success handler
            if (onPaymentSuccess) {
              onPaymentSuccess(successData);
            }

            // Simulate backend booking confirmation
            simulateBookingConfirmation(successData);
          },

          // Payment cancelled callback
          onClose: () => {
            setIsLoading(false);
            setPaymentStatus('cancelled');

            console.log('Payment cancelled by user');

            if (onPaymentCancel) {
              onPaymentCancel({
                reason: 'user_cancelled',
                bookingData: paymentData,
                timestamp: new Date().toISOString(),
              });
            }
          },
        });

        // Open payment modal
        handler.openIframe();
      } catch (error) {
        setIsLoading(false);
        setPaymentStatus('error');
        console.error('Paystack initialization error:', error);

        if (onPaymentError) {
          onPaymentError({
            error: error.message,
            type: 'initialization_error',
            timestamp: new Date().toISOString(),
          });
        }

        alert('Failed to initialize payment. Please try again.');
      }
    };

    script.onerror = () => {
      setIsLoading(false);
      setPaymentStatus('error');

      const errorData = {
        error: 'Failed to load Paystack payment gateway',
        type: 'script_load_error',
        timestamp: new Date().toISOString(),
      };

      if (onPaymentError) {
        onPaymentError(errorData);
      }

      alert(
        'Failed to load payment gateway. Please check your internet connection and try again.'
      );
    };

    document.head.appendChild(script);
  };

  // Simulate backend booking confirmation (replace with actual API call)
  const simulateBookingConfirmation = (successData) => {
    console.log('Simulating booking confirmation...');

    // Store booking in localStorage for demo purposes
    const existingBookings = JSON.parse(
      localStorage.getItem('userBookings') || '[]'
    );
    const newBooking = {
      id: successData.paymentReference,
      ...successData.bookingData,
      confirmedAt: new Date().toISOString(),
    };

    existingBookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));

    // Simulate email confirmation
    console.log(
      'Booking confirmation email would be sent to:',
      successData.customerInfo.email
    );
    console.log('Booking details:', newBooking);
  };

  if (!bookingData) {
    return (
      <div className="w-full p-4 bg-gray-100 rounded-lg text-center">
        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Booking information not available</p>
      </div>
    );
  }

  const { defaultCurrency, supportedCurrencies } = getCurrencyConfig();

  return (
    <div className="w-full">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-1">
                Please fix the following:
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Payment Summary */}
      {bookingCalculation && (
        <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
            Payment Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {formatCurrency(bookingCalculation.pricePerNight)} ×{' '}
                {bookingCalculation.nights} night
                {bookingCalculation.nights !== 1 ? 's' : ''}
              </span>
              <span className="font-medium">
                {formatCurrency(bookingCalculation.baseAmount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Cleaning fee</span>
              <span className="font-medium">
                {formatCurrency(bookingCalculation.cleaningFee)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Service fee</span>
              <span className="font-medium">
                {formatCurrency(bookingCalculation.serviceFee)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Taxes</span>
              <span className="font-medium">
                {formatCurrency(bookingCalculation.taxes)}
              </span>
            </div>

            <div className="border-t border-blue-200 pt-2 mt-3">
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>Total (USD)</span>
                <span>{formatCurrency(bookingCalculation.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm text-blue-600 mt-1">
                <span>Approx. in {defaultCurrency}</span>
                <span>
                  {supportedCurrencies[defaultCurrency].symbol}
                  {(
                    convertToSubunits(
                      bookingCalculation.totalAmount,
                      defaultCurrency
                    ) / supportedCurrencies[defaultCurrency].subunit
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Information Summary */}
      {bookingData.customerInfo && (
        <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <h4 className="font-medium text-green-800 mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Booking Details
          </h4>
          <div className="text-sm text-green-700 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Guest:</span>
                <br />
                {bookingData.customerInfo.firstName}{' '}
                {bookingData.customerInfo.lastName}
              </div>
              <div>
                <span className="font-medium">Guests:</span>
                <br />
                {bookingData.guests}{' '}
                {bookingData.guests === 1 ? 'guest' : 'guests'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Email:</span>
                <br />
                {bookingData.customerInfo.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <br />
                {bookingData.customerInfo.phone || 'Not provided'}
              </div>
            </div>
            {bookingData.checkIn && bookingData.checkOut && (
              <div>
                <span className="font-medium">Stay Duration:</span>
                <br />
                {new Date(bookingData.checkIn).toLocaleDateString()} -{' '}
                {new Date(bookingData.checkOut).toLocaleDateString()}(
                {bookingCalculation?.nights}{' '}
                {bookingCalculation?.nights === 1 ? 'night' : 'nights'})
              </div>
            )}
            {bookingData.customerInfo.arrivalTime && (
              <div>
                <span className="font-medium">Expected Arrival:</span>
                <br />
                <span className="capitalize">
                  {bookingData.customerInfo.arrivalTime.replace('_', ' ')}
                </span>
              </div>
            )}
            {bookingData.customerInfo.specialRequests && (
              <div>
                <span className="font-medium">Special Requests:</span>
                <br />
                <span className="text-xs">
                  {bookingData.customerInfo.specialRequests}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Status */}
      {paymentStatus && (
        <div
          className={`p-4 rounded-xl mb-4 flex items-center ${
            paymentStatus === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : paymentStatus === 'cancelled'
              ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {paymentStatus === 'success' && (
            <CheckCircle className="h-5 w-5 mr-2" />
          )}
          {paymentStatus === 'cancelled' && <Clock className="h-5 w-5 mr-2" />}
          {paymentStatus === 'error' && <X className="h-5 w-5 mr-2" />}

          <span className="font-medium">
            {paymentStatus === 'success' && 'Payment completed successfully!'}
            {paymentStatus === 'cancelled' && 'Payment was cancelled'}
            {paymentStatus === 'error' && 'Payment failed. Please try again.'}
          </span>
        </div>
      )}

      {/* Reserve Button */}
      <button
        onClick={handlePaystackPayment}
        disabled={isLoading || disabled || validationErrors.length > 0}
        className={`${className} ${
          isLoading || disabled || validationErrors.length > 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95 shadow-lg hover:shadow-xl'
        } w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-3" />
            Complete Booking -{' '}
            {bookingCalculation
              ? formatCurrency(bookingCalculation.totalAmount)
              : 'Calculate Total'}
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="mt-4 text-center space-y-2">
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <Shield className="h-3 w-3 mr-1" />
          Secured by Paystack • Your payment information is encrypted and safe
        </p>
        <p className="text-xs text-gray-400">
          Your booking will be confirmed immediately after successful payment
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
          <span>💳 All major cards accepted</span>
          <span>🔒 SSL encrypted</span>
          <span>✅ Instant confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default PaystackCheckout;
