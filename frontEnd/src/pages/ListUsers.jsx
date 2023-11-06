import React, { useState, useEffect } from 'react';

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://arthurpiau.ide.3wa.io:9001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

return (
  <div>
    <h2>Our Users</h2>
    {users.length === 0 ? (
    <p>Loading...</p>
    ) : (
    <ul className="usersList">
      {users.map((users, index) => (
      <li key={index} className="usersItem">
        <h3 className="usersH3">{users.username}</h3>
        <p className="usersIdentity">{users.name} {users.surname}</p>
        <p className="usersRole">{users.role}</p>
        <p className="usersId">{users.idUser}</p>
        </li>
      ))}
    </ul>
    )}
  </div>
);
}
export default ListUsers