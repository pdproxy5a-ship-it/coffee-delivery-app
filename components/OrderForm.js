import { useState } from 'react';

export default function OrderForm({ coffee, location, onOrderComplete, onBack }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    specialInstructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      const orderData = {
        coffee,
        location,
        customerInfo,
        paymentMethod,
        orderTime: new Date().toISOString()
      };

      // In a real app, you'd send this to your backend
      console.log('Order data:', orderData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Order placed successfully! We will contact you shortly.');
      onOrderComplete();
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Order Summary */}
        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Order Summary</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{coffee.name}</p>
              <p className="text-sm text-amber-700">Delivery to: {location}</p>
            </div>
            <p className="font-bold text-amber-900">₱{coffee.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-800 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={customerInfo.specialInstructions}
              onChange={handleInputChange}
              placeholder="Any special requests for your order..."
              className="w-full h-20 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-amber-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 border border-amber-300 rounded-lg cursor-pointer hover:bg-amber-50">
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={paymentMethod === 'gcash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <p className="font-medium">GCash</p>
                  <p className="text-sm text-amber-700">Pay with GCash mobile app</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-amber-300 rounded-lg cursor-pointer hover:bg-amber-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-amber-700">Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Placing Order...
              </>
            ) : (
              `Place Order - ₱${coffee.price}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}