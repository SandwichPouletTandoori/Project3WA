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

    // Send a POST request to your server with the registration data
    fetch('http://arthurpiau.ide.3wa.io:9001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 201) {
          // Registration successful
          setMessage('Registration successful!'); // Display a success message
        } else {
          // Registration failed
          setMessage('Registration failed. Please try again.'); // Display an error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Server error. Please try again later.'); // Display a server error message
      });
  };

  return (
    <>
      <h2>Connect With Us</h2>
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
    </>
  );
};

// const SignUp = () => {
//     const [signUp, setSignUp] = useState('');

//   useEffect(() => {
//     fetch('http://arthurpiau.ide.3wa.io:9001/signup')
//       .then((res) => res.json())
//       .then((data) => setSignUp(data));
//   }, []);
//     return(
//         <>
//             <h2>Connect With Us</h2>
//             <h3>Sign Up !</h3>
//     <form method="post">
//         <div>
//             <label htmlFor="name">Name</label>
//             <input type="text" name="name" id="name" />     
//         </div>
//         <div>
//             <label htmlFor="surname">Surname</label>
//             <input type="text" name="surname" id="surname" />     
//         </div>
//         <div>
//             <label htmlFor="username">Username</label>
//             <input type="text" name="username" id="username" />     
//         </div>
//         <div>
//             <label htmlFor="password">Password</label>
//             <input type="password" name="password" id="password" />   
//         </div>
//         <div>
//             <button type="submit">Sign Up</button>
//         </div>
//     </form>
//         </>
//     )
// }

export default SignUp