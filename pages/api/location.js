// API endpoint for location-related operations
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle location submission
    const { address, coordinates, userId } = req.body;
    
    // Validate required fields
    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required'
      });
    }

    try {
      // In a real application, you would:
      // 1. Validate the coordinates
      // 2. Store in database
      // 3. Check if location is within delivery range
      // 4. Calculate delivery time
      
      console.log('Location received:', {
        address,
        coordinates,
        userId,
        timestamp: new Date().toISOString()
      });

      // Simulate delivery area check
      const isWithinDeliveryArea = checkDeliveryArea(coordinates);
      
      if (!isWithinDeliveryArea) {
        return res.status(400).json({
          success: false,
          message: 'Sorry, we currently don\'t deliver to this area'
        });
      }

      // Calculate estimated delivery time (15-30 minutes)
      const estimatedDeliveryTime = calculateDeliveryTime(coordinates);
      
      res.status(200).json({
        success: true,
        message: 'Location confirmed',
        data: {
          address,
          coordinates,
          estimatedDeliveryTime,
          deliveryFee: calculateDeliveryFee(coordinates)
        }
      });
      
    } catch (error) {
      console.error('Location processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing location'
      });
    }
    
  } else if (req.method === 'GET') {
    // Handle location lookup (if needed)
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    try {
      // Reverse geocoding - convert coordinates to address
      // In a real app, you'd use a service like Google Maps Geocoding API
      const mockAddress = reverseGeocode(parseFloat(lat), parseFloat(lng));
      
      res.status(200).json({
        success: true,
        data: {
          address: mockAddress,
          coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
        }
      });
      
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      res.status(500).json({
        success: false,
        message: 'Error converting coordinates to address'
      });
    }
    
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to check if coordinates are within delivery area
function checkDeliveryArea(coordinates) {
  if (!coordinates) return true; // Skip check if no coordinates provided
  
  // Mock delivery area boundaries (Manila area example)
  const deliveryBounds = {
    north: 14.8000,
    south: 14.5000,
    east: 121.1000,
    west: 120.9000
  };

  const { lat, lng } = coordinates;
  
  return (
    lat >= deliveryBounds.south &&
    lat <= deliveryBounds.north &&
    lng >= deliveryBounds.west &&
    lng <= deliveryBounds.east
  );
}

// Helper function to calculate estimated delivery time
function calculateDeliveryTime(coordinates) {
  // Base time + distance factor
  const baseTime = 15; // minutes
  const additionalTime = coordinates ? 5 : 10; // Less time if we have exact coordinates
  
  return baseTime + additionalTime;
}

// Helper function to calculate delivery fee
function calculateDeliveryFee(coordinates) {
  const baseFee = 20; // PHP
  // In real app, calculate based on distance from your store
  return coordinates ? baseFee : baseFee + 10;
}

// Mock reverse geocoding function
function reverseGeocode(lat, lng) {
  // In a real app, you'd call Google Maps Geocoding API or similar
  // This is a mock implementation
  const addresses = [
    "123 Main Street, Manila",
    "456 Coffee Avenue, Makati", 
    "789 Brew Street, Taguig",
    "321 Barista Road, Pasig"
  ];
  
  // Simple hash based on coordinates to pick a mock address
  const index = Math.abs(Math.floor((lat + lng) * 1000)) % addresses.length;
  return addresses[index];
}