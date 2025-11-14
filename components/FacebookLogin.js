import { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';

export default function FacebookAuth({ onLogin, onLogout }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const responseFacebook = (response) => {
    console.log('Facebook Login Response:', response);
    
    if (response.accessToken) {
      setUser({
        name: response.name,
        email: response.email,
        picture: response.picture?.data?.url,
        userID: response.userID,
        accessToken: response.accessToken
      });
      setIsLoggedIn(true);
      
      // Send to backend for verification
      verifyFacebookToken(response.accessToken, response.userID)
        .then(userData => {
          onLogin(userData);
        })
        .catch(error => {
          console.error('Token verification failed:', error);
        });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    onLogout();
    
    // In a real app, you might want to call Facebook logout API
    window.FB.logout(() => {
      console.log('Facebook logout complete');
    });
  };

  const verifyFacebookToken = async (accessToken, userID) => {
    try {
      const response = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, userID }),
      });

      const data = await response.json();
      
      if (data.success) {
        return data.user;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  };

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load the Facebook SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isLoggedIn ? (
        <div className="w-full">
          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email"
            callback={responseFacebook}
            cssClass="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            icon="fa-facebook"
            textButton="Continue with Facebook"
          />
          
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">We'll never post without your permission</p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Logout from Facebook
          </button>
        </div>
      )}
    </div>
  );
}