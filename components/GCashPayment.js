import { useState } from 'react';

export default function GCashPayment({ amount, onSuccess, onCancel }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate GCash API call
      const paymentData = {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        amount: amount,
        reference: 'COFFEE' + Date.now(),
        description: 'Coffee Order Payment'
      };

      // In real implementation, you'd call your backend which calls GCash API
      const response = await processGCashPayment(paymentData);
      
      if (response.success) {
        setQrCode(response.qrCode);
        // In real app, you'd poll for payment status
        setTimeout(() => {
          onSuccess(response);
        }, 3000);
      } else {
        alert('Payment failed: ' + response.message);
      }
    } catch (error) {
      console.error('GCash payment error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processGCashPayment = async (paymentData) => {
    // Simulate API call to your backend
    const response = await fetch('/api/payments/gcash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    return await response.json();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">💰</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pay with GCash</h2>
        <p className="text-gray-600 mt-2">Complete your payment securely</p>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Amount to pay:</p>
          <p className="text-2xl font-bold text-green-900">₱{amount}</p>
        </div>
      </div>

      {!qrCode ? (
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GCash Mobile Number *
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09XX XXX XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter your GCash-registered mobile number
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 You will receive a payment request on your GCash app. 
              Please check your notifications and confirm the payment.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                'Pay with GCash'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-green-300">
            <div className="w-48 h-48 bg-gray-100 mx-auto flex items-center justify-center mb-4">
              {/* In real app, display actual QR code */}
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm text-gray-600">QR Code would appear here</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code with your GCash app or check your GCash notifications
            </p>
          </div>
          
          <div className="loading-dots flex justify-center">
            <div></div>
            <div></div>
            <div></div>
          </div>
          
          <p className="text-green-600 font-semibold">
            Waiting for payment confirmation...
          </p>
        </div>
      )}
    </div>
  );
}