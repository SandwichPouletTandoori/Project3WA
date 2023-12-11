import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://arthurpiau.ide.3wa.io:9001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 201) {
          setMessage('Registration successful!');
        } else {
          setMessage('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Server error. Please try again later.');
      });
  };

  return (
    <main>
      <h2>Connect With Us!</h2>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </main>
  );
};

export default SignUp