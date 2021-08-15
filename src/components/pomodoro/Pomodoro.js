import React, { Component, useEffect, useState } from "react";
import TypeSelect from "./TypeSelect";
import TimeDisplay from "./TimeDisplay";
import Controls from "./Controls";
import "./Pomodoro.css";

import VerticalBar from "./VerticalBar";

import auth from "../../auth/auth-helper";

const baseUrl = "https://focusedmode-1ee71-default-rtdb.firebaseio.com/users/";

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var d = new Date();
var today = weekday[d.getDay()];

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.types[0],
      time: props.types[0].time,
      interval: null,
      pomodoroCount: [],
      running: false,
      data: {},
    };
  }

  getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  createPomodo = async () => {
    const response = await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoro/monday.json",
      {
        method: "PUT",
        body: "3",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  resetPomodoro = async () => {
    await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoro/" + today + ".json",
      {
        method: "PUT",
        body: "0",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const today_date = this.getDate();
    await fetch(baseUrl + auth.isAuthenticated() + "/pomodoro/date.json", {
      method: "PUT",
      body: JSON.stringify(today_date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  loadData = () => {
    fetch(baseUrl + auth.isAuthenticated() + "/pomodoro.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.date == this.getDate());
        if (data.date != this.getDate()) {
          this.resetPomodoro();
        }
        let pomodoros = data[weekday[d.getDay()]];
        let pomodoroCount = new Array(pomodoros);
        pomodoroCount.fill(1);
        this.setState((preState) => {
          return { ...preState, data: data, pomodoroCount };
        });
      });
  };

  componentDidMount() {
    this.loadData();
  }

  static defaultProps = {
    types: [
      { name: "Pomodoro", time: 1500 }, 
      { name: "Short Break", time: 300 },
      { name: "Long Break", time: 900 },
    ],
  };

  changeType = (type) => {
    this.resetTimer();
    this.setState({ selectedType: type, time: type.time, running: false });
  };

  tick = async () => {
    if (this.state.time <= 1) {
      this.stopInterval();
      if (this.state.selectedType.name == "Pomodoro") {
        const newCount = this.state.pomodoroCount.length + 1;
        await fetch(
          baseUrl + auth.isAuthenticated() + "/pomodoro/" + today + ".json",
          {
            method: "PUT",
            body: newCount,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.loadData();
        // this.setState({ pomodoroCount: [...this.state.pomodoroCount, 1] });
      }
      this.setState((prevState) => ({ ...prevState, running: false }));
    }
    this.setState((state) => {
      return { time: state.time - 1 };
    });
  };

  stopInterval = () => {
    clearInterval(this.state.interval);
    console.log("removing");
    console.log("this.state.interval " + this.state.interval);

    this.setState({ interval: null });
  };

  startTimer = () => {
    const newInterval = setInterval(this.tick, 1000);
    this.setState((state) => ({
      running: true,
      interval: newInterval,
      time: state.time > 0 ? state.time : state.selectedType.time,
    }));
  };

  resetTimer = () => {
    this.stopInterval();
    this.setState((state) => ({
      time: state.selectedType.time,
      running: false,
    }));
  };

  pauseTimer = () => {
    this.state.interval ? this.stopInterval() : this.startTimer();
  };

  getStatus = () => {
    const { time, running, interval } = this.state;
    if (time === 0) return "Finished";
    if (running && !interval) return "Paused";
    if (running) return "Running";
  };

  getProgress = () => {
    const current = this.state.time;
    const total = this.state.selectedType.time;
    return ((total - current) / total) * 100;
  };

  updatePomodoro = async (newItem) => {
    const response = await fetch(
      baseUrl + auth.isAuthenticated() + "/pomodoro.json",
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
      baseUrl + auth.isAuthenticated() + "/pomodoro/" + key + "/completed.json",
      {
        method: "PUT",
        body: JSON.stringify(!completed),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  pomodoroList = () => {
    let list = "";
    for (let i = 0; i < 5; i++) {
      list += <h1>{i}</h1>;
    }

    return list;
  };

  render() {
    const { time, selectedType } = this.state;
    const { types } = this.props;

    return (
      <div className="Content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm">
              <div className="Pomodoro">
                <TypeSelect
                  types={types}
                  selected={selectedType}
                  changeType={this.changeType}
                />
                <br />
                <TimeDisplay
                  time={time}
                  status={this.getStatus()}
                  progress={this.getProgress()}
                />
                <br />
                <Controls
                  start={this.startTimer}
                  reset={this.resetTimer}
                  pause={this.pauseTimer}
                  status={this.getStatus()}
                />
                <br />
                <div class="col-sm">
                  <h5>Pomodoros: {this.state.pomodoroCount.length}</h5>
                </div>
                <div className="tomato">
                  {this.state.pomodoroCount.map((pomodoro, i) => (
                    <span key={i} className="dot"></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
