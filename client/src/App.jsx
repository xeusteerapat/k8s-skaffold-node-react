import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:8080/users');
      const data = await res.json();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className='App'>
      <h1>Hi</h1>
      {!users.length ? (
        <p>Loading...</p>
      ) : (
        users.map(user => <li key={user.id}>{user.name}</li>)
      )}
    </div>
  );
}

export default App;
