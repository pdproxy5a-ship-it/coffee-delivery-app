import { useState } from 'react';

export default function LocationPicker({ onLocationConfirm, onBack }) {
  const [location, setLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you'd reverse geocode this to get an address
        setLocation(`Near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setUseCurrentLocation(true);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter it manually.');
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert('Please enter your location or use your current location');
      return;
    }
    onLocationConfirm(location);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="text-amber-600 hover:text-amber-800 font-medium mb-4 flex items-center"
        >
          ← Back to Menu
        </button>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Delivery Location</h2>
        <p className="text-amber-700">Where should we deliver your coffee?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-amber-800 font-medium mb-2">
            Delivery Address
          </label>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your complete address..."
            className="w-full h-24 px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50"
          >
            {isGettingLocation ? (
              <>
                <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Getting Location...</span>
              </>
            ) : (
              <>
                <span>📍</span>
                <span>Use Current Location</span>
              </>
            )}
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            Continue to Order
          </button>
        </div>
      </form>
    </div>
  );
}