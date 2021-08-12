import React, { Component } from "react";
import TypeSelect from "./TypeSelect";
import TimeDisplay from "./TimeDisplay";
import Controls from "./Controls";
import "./Pomodoro.css";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.types[0],
      time: props.types[0].time,
      interval: null,
      pomodoroCount: [],
      running: false
    };
  }

  static defaultProps = {
    types: [
      { name: 'Pomodoro', time: 10 }, //1500
      { name: 'Short Break', time: 3 }, //300
      { name: 'Long Break', time: 900 }
    ]
  };

  changeType = type => {
    this.resetTimer();
    this.setState({ selectedType: type, time: type.time, running: false });
  };

  tick = () => {
    if (this.state.time <= 1) {
      this.stopInterval();
      if(this.state.selectedType.name=="Pomodoro"){
        this.setState({ pomodoroCount: [...this.state.pomodoroCount, 1] });
      }
      this.setState({ running: false });
    }
    this.setState(state => ({ time: state.time - 1 }));
  };

  stopInterval = () => {
    clearInterval(this.state.interval);
    console.log('removing');
    console.log('this.state.interval ' + this.state.interval);
    this.setState({ interval: null });
  };

  startTimer = () => {
    const newInterval = setInterval(this.tick, 1000)
    this.setState(state => ({
      running: true,
      interval: newInterval,
      time: state.time > 0 ? state.time : state.selectedType.time
    }));
  };

  resetTimer = () => {
    this.stopInterval();
    this.setState(state => ({
      time: state.selectedType.time,
      running: false
    }));
  };

  pauseTimer = () => {
    this.state.interval ? this.stopInterval() : this.startTimer();
  };

  getStatus = () => {
    const { time, running, interval } = this.state;
    if (time === 0) return 'Finished';
    if (running && !interval) return 'Paused';
    if (running) return 'Running';
  };

  getProgress = () => {
    const current = this.state.time;
    const total = this.state.selectedType.time;
    return ((total - current) / total) * 100;
  };

  render() {
    const { time, selectedType } = this.state;
    const { types } = this.props;

    return (
      <div className="Content">
        <div className="Pomodoro">
          <TypeSelect
            types={types}
            selected={selectedType}
            changeType={this.changeType}
          />
          <TimeDisplay
            time={time}
            status={this.getStatus()}
            progress={this.getProgress()}
          />
          <Controls
            start={this.startTimer}
            reset={this.resetTimer}
            pause={this.pauseTimer}
            status={this.getStatus()}
          />
          <div className="tomato">
            {this.state.pomodoroCount.map((pomodoro, i) => <span key={i} className="dot"></span>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
