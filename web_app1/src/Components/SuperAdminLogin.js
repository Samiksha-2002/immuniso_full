import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import '../css/login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // Adjust this import if necessary

function SuperAdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = getAuth(app); // Initialize auth with the Firebase app instance
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dash'); // Redirect to Dash1 component after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <div className="login">
      <div>
        <h1>Immuniso</h1>
        <h3>Super Admin Login</h3>
      </div>

      <form onSubmit={handleSignIn}>
        <label htmlFor="loginId"><b>Login Id</b></label>
        <input
          type="email"
          id="loginId"
          name="loginId"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/forgot-password">Forgot Password?</Link>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SuperAdminLogin;
