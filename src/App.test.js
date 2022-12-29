import React, { Component } from "react";
import "./styles/App.css";
import beep from "./files/BeepSound.wav";
class AppTest extends Component {
  state = {
    break: 5,
    session: 25,
    bMins: 5,
    sMins: 25,
    seconds: 0,
    current: "Session",
    timer: false,
    timerId: "",
  };
  // Decrement Action
  decrement = (e) => {
    if (e.target.id === "break-decrement") {
      if (this.state.break > 1) {
        this.setState({
          break: this.state.break - 1,
          bMins: this.state.bMins - 1,
        });
      }
    } else if (e.target.id === "session-decrement") {
      if (this.state.session > 1) {
        this.setState({
          session: this.state.session - 1,
          sMins: this.state.sMins - 1,
        });
      }
    }
  };
  // Increment Action
  increment = (e) => {
    if (e.target.id === "break-increment") {
      if (this.state.break < 60) {
        this.setState({
          break: this.state.break + 1,
          bMins: this.state.bMins + 1,
        });
      }
    } else if (e.target.id === "session-increment") {
      if (this.state.session < 60) {
        this.setState({
          session: this.state.session + 1,
          sMins: this.state.sMins + 1,
        });
      }
    }
  };
  // Two-Digit Numbers
  twoDigit = (num) => {
    if (num >= 10) {
      return num;
    } else {
      return "0" + num;
    }
  };

  // Timer
  timer = (e, r) => {
    let startStop = document.getElementById("start_stop");
    if (r || !this.state.timer) {
      let counter = setInterval(() => {
        if (this.state.current === "Session") {
          if (this.state.seconds > 0) {
            this.setState({
              seconds: this.state.seconds - 1,
            });
          } else if (this.state.seconds === 0 && this.state.sMins !== 0) {
            this.setState({
              sMins: this.state.sMins - 1,
              seconds: 59,
            });
          }
        } else if (this.state.current === "Break") {
          if (this.state.seconds > 0) {
            this.setState({
              seconds: this.state.seconds - 1,
            });
          } else if (this.state.seconds === 0 && this.state.bMins !== 0) {
            this.setState({
              bMins: this.state.bMins - 1,
              seconds: 59,
            });
          }
        }
      }, 1000);
      this.setState({
        timerId: counter,
        timer: true,
      });
      startStop.classList.remove("start");
      startStop.classList.add("stop");
    } else if (this.state.timer) {
      clearInterval(this.state.timerId);
      this.setState({
        timer: false,
      });
      startStop.classList.add("start");
      startStop.classList.remove("stop");
    }
  };
  // Reset Action
  reset = () => {
    let startStop = document.getElementById("start_stop");
    let beepSound = document.getElementById("beep");
    this.setState({
      break: 5,
      session: 25,
      bMins: 5,
      sMins: 25,
      seconds: 0,
      current: "Session",
      timer: false,
    });
    clearInterval(this.state.timerId);
    startStop.classList.add("start");
    startStop.classList.remove("stop");
    beepSound.pause();
    beepSound.currentTime = 0;
  };

  componentDidUpdate() {
    let beepSound = document.getElementById("beep");
    if (this.state.timer === true && this.state.seconds === 0) {
      if (this.state.current === "Session" && this.state.sMins === 0) {
        // this.setState({
        //   timer: false,
        // });
        beepSound.play();
        setTimeout(() => {
          this.setState({
            current: "Break",
            sMins: this.state.session,
          });
          clearInterval(this.state.timerId);
          this.timer(null, true);
        }, 3000);
      } else if (this.state.current === "Break" && this.state.bMins === 0) {
        // this.setState({
        //   timer: false,
        // });
        beepSound.play();
        setTimeout(() => {
          this.setState({
            current: "Session",
            bMins: this.state.break,
          });
          clearInterval(this.state.timerId);
          this.timer(null, true);
        }, 3000);
      }
    }
  }
  render() {
    return (
      <div id="app">
        <h1 id="app-name">Pomodoro Timer</h1>
        <div className="app-options">
          <div id="break-option">
            <h2 id="break-label">Break Length</h2>
            <div className="break-controls">
              <button
                id="break-decrement"
                className="down"
                onClick={this.decrement}
              ></button>
              <span id="break-length">{this.state.break}</span>
              <button
                id="break-increment"
                className="up"
                onClick={this.increment}
              ></button>
            </div>
          </div>
          <div id="session-option">
            <h2 id="session-label">Session Length</h2>
            <div className="session-controls">
              <button
                id="session-decrement"
                className="down"
                onClick={this.decrement}
              ></button>
              <span id="session-length">{this.state.session}</span>
              <button
                id="session-increment"
                className="up"
                onClick={this.increment}
              ></button>
            </div>
          </div>
        </div>
        <div className="timer">
          <div className="timer-area">
            <h2 id="timer-label">{this.state.current}</h2>
            <p id="time-left">
              {`${
                this.state.current === "Session"
                  ? this.twoDigit(this.state.sMins)
                  : this.state.current === "Break"
                  ? this.twoDigit(this.state.bMins)
                  : "00"
              }:${this.twoDigit(this.state.seconds)}`}
            </p>
          </div>
          <div className="timer-controls">
            <button id="start_stop" className="start" onClick={this.timer}>
              {!this.state.timer ? "Start" : "Stop"}
            </button>
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
            <audio id="beep">
              <source src={beep}></source>
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

export default AppTest;
