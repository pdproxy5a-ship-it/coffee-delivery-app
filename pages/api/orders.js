export default function handler(req, res) {
  if (req.method === 'POST') {
    // In a real application, you would:
    // 1. Validate the order data
    // 2. Store in a database
    // 3. Process payment (if GCash)
    // 4. Send confirmation email/SMS
    
    const orderData = req.body;
    
    // Simulate order processing
    console.log('New order received:', orderData);
    
    // Simulate successful order creation
    const orderId = 'ORD' + Date.now();
    
    res.status(200).json({
      success: true,
      orderId: orderId,
      message: 'Order placed successfully'
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}