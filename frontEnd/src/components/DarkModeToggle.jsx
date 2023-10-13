import React, { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const localStorage = "http://arthurpiau.ide.3wa.io:9000/contact"

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('dark-mode') === 'enabled';
    setIsDarkMode(storedDarkMode);

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function () {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      body.classList.toggle('dark-mode', newDarkMode);
      localStorage.setItem('dark-mode', newDarkMode ? 'enabled' : 'disabled');
    });
  }, [isDarkMode]);

  return (
    <button id="dark-mode-toggle">Toggle Dark Mode</button>
  );
}

export default DarkModeToggle;