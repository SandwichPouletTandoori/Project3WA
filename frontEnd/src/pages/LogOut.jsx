import React, { useState } from 'react';

const LogOut = () => {
  const [userData, setUserData] = useState({ username: '', role: '' });

  const handleLogout = async () => {
    console.log('logout')
    try {
      const response = await fetch('http://arthurpiau.ide.3wa.io:9001/logout', {
        method: 'GET',
      });
console.log(response.status)
      if (response.status === 204) {
        
        setUserData({ username: '', role: '' }); 

        sessionStorage.clear();

        window.location.href = '/';
      } else {
       
        console.error('Error during logout');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <main>
      <p>Click here to Log Out. Thank you for using our application.</p>
      <button onClick={handleLogout}>Log Out</button>
    </main>
  );
};

export default LogOut;