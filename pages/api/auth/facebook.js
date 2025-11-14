import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessToken, userID } = req.body;

    if (!accessToken || !userID) {
      return res.status(400).json({
        success: false,
        message: 'Access token and user ID are required'
      });
    }

    try {
      // Verify the Facebook access token
      const verifyResponse = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
      );

      const tokenData = verifyResponse.data.data;

      if (!tokenData.is_valid || tokenData.user_id !== userID) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Facebook token'
        });
      }

      // Get user profile information
      const profileResponse = await axios.get(
        `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
      );

      const userProfile = profileResponse.data;

      // In a real app, you would:
      // 1. Check if user exists in your database
      // 2. Create new user if doesn't exist
      // 3. Create session/token
      // 4. Return user data

      const userData = {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        picture: userProfile.picture?.data?.url,
        provider: 'facebook'
      };

      res.status(200).json({
        success: true,
        user: userData,
        message: 'Facebook authentication successful'
      });

    } catch (error) {
      console.error('Facebook auth error:', error);
      res.status(500).json({
        success: false,
        message: 'Facebook authentication failed'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}