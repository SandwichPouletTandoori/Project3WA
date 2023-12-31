import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = { username, password };

    fetch('http://arthurpiau.ide.3wa.io:9001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          sessionStorage.setItem('isLogged', 1);
          window.location.href = '/';
          } else {
        console.error('Login failed:', data.error);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
    });
};

  return (
    <main>
      <h2>Connect With Us</h2>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}

export default LogIn