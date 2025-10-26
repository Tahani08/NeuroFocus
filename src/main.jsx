import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="315853748641-sar55h7fl6295610ffjvli19sd4smsqf.apps.googleusercontent.com"> 
    <App />
  </GoogleOAuthProvider>
);

