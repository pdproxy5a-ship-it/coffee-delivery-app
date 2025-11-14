import { useState } from 'react';

export default function LocationPicker({ onLocationConfirm, onBack }) {
  const [location, setLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Call our API to reverse geocode the coordinates
          const response = await fetch(`/api/location?lat=${latitude}&lng=${longitude}`);
          const data = await response.json();
          
          if (data.success) {
            setLocation(data.data.address);
            setUseCurrentLocation(true);
          } else {
            setLocation(`Near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          console.error('Error reverse geocoding:', error);
          setLocation(`Near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to get your location. Please enter it manually.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied. Please enable location services or enter address manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please enter your address manually.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or enter address manually.';
            break;
        }
        
        alert(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert('Please enter your location or use your current location');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send location to our API for validation and processing
      const locationData = {
        address: location,
        coordinates: useCurrentLocation ? getCoordinatesFromLocation(location) : null,
        userId: 'user-' + Date.now() // In real app, use actual user ID
      };

      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      });

      const data = await response.json();

      if (data.success) {
        onLocationConfirm({
          address: location,
          ...data.data
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Error processing location. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to extract coordinates from location string
  const getCoordinatesFromLocation = (locationString) => {
    const coordMatch = locationString.match(/Near ([\d.-]+), ([\d.-]+)/);
    if (coordMatch) {
      return {
        lat: parseFloat(coordMatch[1]),
        lng: parseFloat(coordMatch[2])
      };
    }
    return null;
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
            Delivery Address *
          </label>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your complete address (street, barangay, city)..."
            className="w-full h-24 px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-sm text-amber-600 mt-1">
            Please provide specific landmarks or complete address for accurate delivery
          </p>
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
            disabled={isSubmitting || !location.trim()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Checking...</span>
              </div>
            ) : (
              'Continue to Order'
            )}
          </button>
        </div>
      </form>

      {useCurrentLocation && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm flex items-center">
            <span className="mr-2">✅</span>
            Using your current location for accurate delivery
          </p>
        </div>
      )}
    </div>
  );
}