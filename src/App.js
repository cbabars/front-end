// src/App.js
import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: parseInt(number) }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ status: 'error', message: 'An error occurred' });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Number To Word</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Enter Number</label>
          <input
            type="number"
            className="form-control"
            id="number"
            name="number"
            value={number}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {response && (
        <div className="mt-4">
          {response.status === 'success' ? (
            <div className="alert alert-success">
              {`Number in words: ${response.words}`}
            </div>
          ) : (
            <div className="alert alert-danger">
              {`Error: ${response.message}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
