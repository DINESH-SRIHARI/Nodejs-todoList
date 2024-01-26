import React from 'react'

export default function Add() {
  return (
    <div>
      <div className="row justify-content-center m-5">
    <div className="col-md-8">
        <h3 className="mb-4">Add New Task</h3>
        <form action="/addtask" method="post">
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">New Task</label>
                <input type="text" name="title" className="form-control" id="exampleFormControlInput1" placeholder="Add Title"/>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Task Description</label>
                <input type="text" name="desc" className="form-control"  placeholder="Add Description"/>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Due Date</label>
                <input type="datetime-local" name="type" className="form-control"  placeholder="Type"/>
              </div>
              
              <button className="btn btn-dark py-2 px-5">Add Task</button>
        </form>
    </div>
</div>

    </div>
  )
}
