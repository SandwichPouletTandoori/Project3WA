import React, { useState, useEffect } from 'react';

const Error404 = () => {
    const [error404, setError404] = useState('');

  useEffect(() => {
    fetch('http://arthurpiau.ide.3wa.io:9001/*')
      .then((res) => res.json())
      .then((data) => setError404(data));
  }, []);
    return(
        <>
            <h2>Error 404, requested page could not be found.</h2>
        </>
    )
}

export default Error404