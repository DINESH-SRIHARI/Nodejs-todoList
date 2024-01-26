import React from 'react';

export default function Edit({ all }) {
  return (
    <div>
      <div className="row justify-content-center m-5">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">DueDate</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {all.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.duedate}</td>
                  <td>
                    <div className="d-flex">
                      <form action="/e" method="post">
                        <input
                          value={item.title}
                          type="hidden"
                          name="name"
                        />
                        <button className="btn btn-danger" type="submit">
                          edit
                        </button>
                      </form>
                      <form action="/deleteOne" method="post">
                        <input
                          type="hidden"
                          value={item.title}
                          name="mail"
                        />
                        <button
                          className="btn btn-dark mx-2"
                          type="submit"
                        >
                          delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
