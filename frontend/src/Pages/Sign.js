import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sign() {
  const [email, setEmail] = useState(''); // Create state for email
  const [password, setPassword] = useState(''); // Create state for password

  const handleCreateUser = async (e) => {
    e.preventDefault();
    console.log('emailnb');
    console.log(email);
    try {
      const response = await fetch("http://localhost:5000/s", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
          email: email, // Use state value for email
          password: password, // Use state value for password
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        console.log('User created successfully');
        // Handle any other logic after successful user creation
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <div className='mt-5 d-flex justify-content-around'>
            <div>
              <Link to='/l' className='hov dropdown-item'>Login</Link>
            </div>

            <div>
              <Link className='hov dropdown-item'><u>Sign in</u></Link>
            </div>
          </div>
          <form onSubmit={handleCreateUser}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-5">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-5">Password</label>
              <input type="password" className="form-control" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='btn btn-dark'>Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
