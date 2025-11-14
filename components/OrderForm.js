import { useState } from 'react';
import GCashPayment from './GCashPayment';
import FacebookAuth from './FacebookLogin';

export default function OrderForm({ coffee, location, onOrderComplete, onBack }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    specialInstructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGCash, setShowGCash] = useState(false);
  const [user, setUser] = useState(null);

  const handleFacebookLogin = (userData) => {
    setUser(userData);
    setCustomerInfo(prev => ({
      ...prev,
      name: userData.name,
      email: userData.email
    }));
  };

  const handleFacebookLogout = () => {
    setUser(null);
  };

  const handleGCashSuccess = (paymentData) => {
    // Process order with successful GCash payment
    processOrder('gcash', paymentData);
  };

  const processOrder = async (method, paymentData = null) => {
    setIsSubmitting(true);

    try {
      const orderData = {
        coffee,
        location,
        customerInfo: user ? { ...customerInfo, facebookId: user.id } : customerInfo,
        paymentMethod: method,
        paymentData,
        user,
        orderTime: new Date().toISOString()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Order placed successfully! We will contact you shortly.');
        onOrderComplete();
      } else {
        alert('Error placing order: ' + result.message);
      }
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showGCash) {
    return (
      <GCashPayment
        amount={coffee.price}
        onSuccess={handleGCashSuccess}
        onCancel={() => setShowGCash(false)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-amber-500 p-6 text-white">
        <button 
          onClick={onBack}
          className="text-amber-100 hover:text-white font-medium mb-4 flex items-center"
        >
          ← Back to Location
        </button>
        <h2 className="text-2xl font-bold">Complete Your Order</h2>
      </div>

      <div className="p-6">
        {/* Facebook Login Section */}
        <div className="mb-6">
          <FacebookAuth onLogin={handleFacebookLogin} onLogout={handleFacebookLogout} />
        </div>

        {/* Order Summary */}
        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Order Summary</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{coffee.name}</p>
              <p className="text-sm text-amber-700">Delivery to: {location.address}</p>
            </div>
            <p className="font-bold text-amber-900">₱{coffee.price}</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-amber-900 mb-4">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-amber-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowGCash(true)}
                className="w-full flex items-center space-x-3 p-4 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💰</span>
                </div>
                <div>
                  <p className="font-medium">Pay with GCash</p>
                  <p className="text-sm text-gray-600">Instant secure payment</p>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => processOrder('cod')}
                disabled={isSubmitting}
                className="w-full flex items-center space-x-3 p-4 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors text-left disabled:opacity-50"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💵</span>
                </div>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay when you receive your order</p>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}