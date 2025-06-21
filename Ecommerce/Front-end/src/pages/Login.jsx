import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      try {
        const res = await axios.post('http://localhost:5000/send-otp', {
          email: email.trim().toLowerCase(),
        });

        if (res.data.success) {
          alert('OTP sent to your email.');
          setShowOtpInput(true);
        }
      } catch (err) {
        alert('Error sending OTP');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/verify-otp', {
        email: email.trim().toLowerCase(),
        otp: otp.toString(),
      });

      if (res.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful');
        navigate('/');
      }
    } catch (err) {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      {!showOtpInput ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </label>

          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </label>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerify} style={styles.form}>
          <label style={styles.label}>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter OTP sent to email"
            />
          </label>

          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '15px',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
