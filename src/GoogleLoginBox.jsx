import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";

const GoogleLoginBox = () => {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      // You can also fetch user info with the token here if needed
      const decoded = jwtDecode(tokenResponse.credential || tokenResponse.access_token);
      setUser(decoded);
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  return (
    <div style={{
      padding: '1rem',
      background: '#222',
      borderRadius: '10px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button
            onClick={() => {
              googleLogout();
              setUser(null);
            }}
            style={{
              marginTop: '0.5rem',
              padding: '8px 12px',
              borderRadius: '8px',
              background: '#fff',
              color: '#222',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => login()}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          📅 Connect your Google Calendar
        </button>
      )}
    </div>
  );
};

export default GoogleLoginBox;

