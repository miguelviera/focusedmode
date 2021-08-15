import React, { Component } from "react";

export default class TodoItem extends Component {
  handleChange = () => {}
  render() {
    const { id, title, handleDelete, handleEdit, handleDoneTask, completed } =
      this.props;



    return (
      <li className="list-group-item d-flex justify-content-between">
        <h6
          className={`mt-1 mb-0 align-middle ${
            completed ? "completed-task" : ""
          }`}
        >
          {title}
        </h6>
        <div className="todo-icon">
          <span
            className={`mx-14 ${completed ? "text-success" : "text-secondary"} `}
          >
            <input
              type="checkbox"
              onClick={() => handleDoneTask(id, completed)}
              onChange={this.handleChange}
              checked={completed}
              className="form-check-input"
              id="exampleCheck1"
            ></input>
          </span>
          <span className="mx-2 text-warning">
            <button type="button" onClick={handleEdit} className="btn btn-warning">
              Edit
            </button>
          </span>
          <span className="mx-2 text-danger">
            <button type="button" onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </span>
        </div>
      </li>
    );
  }
}