import React, { Component } from "react";
import uuid from "uuid";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import auth from "../../auth/auth-helper";

const baseUrl = "https://focusedmode-1ee71-default-rtdb.firebaseio.com/users/";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsToShow: "all",
      item: "",
      editItem: false,
    };
  }

  loadData = () => {
    fetch(baseUrl + auth.isAuthenticated() + "/pomodoros.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pomodoros = [];
        console.log(data);
        for (const key in data) {
          const pomodoro = {
            ...data[key],
            key,
          };
          pomodoros.push(pomodoro);
        }
        this.setState((preState) => {
          return { ...preState, items: pomodoros };
        });
      });
  };

  componentDidMount() {
    this.loadData();
  }

  handleChange = (event) => {
    this.setState({
      item: event.target.value,
    });
  };

  createPomodoro = async (newItem) => {
    const response = await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoros.json",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  editPomodoro = async (key, completed) => {
    const response = await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoros/"+key+"/completed.json",
      {
        method: "PUT",
        body: JSON.stringify(!completed),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      title: this.state.item,
      completed: false,
    };


    await this.createPomodoro(newItem);

	this.setState({item: ''})

    this.loadData();
  };

  updateTodosToShow = (string) => {
    this.setState({
      itemsToShow: string,
    });
  };

  handleDoneTask = async (key, completed) => {
	await this.editPomodoro(key, completed)
    const filteredItems = this.state.items.map((item) => {
      item.key === key && (item.completed = !item.completed);
      return item;
    });

    this.setState({
      items: filteredItems,
    });
  };

  deletePomodoro = async (key) => {
    await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoros/" + key + ".json",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  handleDelete = async (key) => {
    await this.deletePomodoro(key);
    this.loadData();
  };

  handleEdit = async (key) => {
    await this.deletePomodoro(key);

    const selectedItem = this.state.items.find((item) => item.key === key);

    const filteredItems = this.state.items.filter((item) => item.key !== key);

    this.setState({
      items: filteredItems,
      key: key,
      item: selectedItem.title,
      editItem: true,
    });
  };

  handleDeleteDoneTasks = () => {
    const filteredItems = this.state.items.filter((item) => {
      if (item.completed === true) {
        this.deletePomodoro(item.key);
        return false;
      }
      return true;
    });

    this.setState({
      items: filteredItems,
    });
  };

  clearList = () => {
    this.state.items.map((item) => {
      this.deletePomodoro(item.key);
    });
    this.setState({
      items: [],
    });
  };

  render() {
    let items = [];

    if (this.state.itemsToShow === "all") {
      items = this.state.items;
    } else if (this.state.itemsToShow === "todo") {
      items = this.state.items.filter((item) => !item.completed);
    } else if (this.state.itemsToShow === "done") {
      items = this.state.items.filter((item) => item.completed);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 mx-auto mt-4">
            <h3 className="text-capitalize text-center">TodoInput</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <TodoList
              items={items}
              filterDoneTasks={this.filterDoneTasks}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleDoneTask={this.handleDoneTask}
              handleDeleteDoneTasks={this.handleDeleteDoneTasks}
              updateTodosToShow={this.updateTodosToShow}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
