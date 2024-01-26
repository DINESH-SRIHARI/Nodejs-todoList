
import React, { useState, useEffect } from 'react';
export default function Home() {
    const [all, setAll] = useState([]);

  useEffect(() => {
   
    fetch('http://localhost:5000/api/tasks') 
      .then((response) => response.json())
      .then((data) => setAll(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>
      <div className="row justify-content-center">
      <div className="col-md-6 my-5">
        {all.map((item, index) => (
          <div className="m-2" key={index}>
            <div className="d-flex aline">
              <input type="checkbox" className="mx-3" />
              <td className="mx-3 p">{item.title}</td>
              <form className="mx-3" method="post" action="/deleteOne">
                <button
                  className="btn btn-light mx-2"
                  value={item.title}
                  name="mail"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                    <path fill="#1f5142" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ))}
        {all.length > 0 ? (
          <form method="post" action="/deleteall">
            <button className="btn btn-danger m-5 px-3">Remove All Tasks</button>
          </form>
        ) : (
          <div>
            <h1 className="mx-5">No task Added</h1>
            <a className="btn btn-dark mx-5" href="/add">
              Add New Task
            </a>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
