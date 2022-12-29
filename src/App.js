import React, { Component } from "react";
import "./styles/App.css";
import beep from "./files/BeepSound.wav";
import TimerOptions from "./components/TimerOptions";
import TimerArea from "./components/TimerArea";
import TimerControls from "./TimerControls";
class App extends Component {
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
  timerSwitcher = (e, r) => {
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
    let timeLeft = document.getElementById("time-left");
    if (this.state.timer === true && this.state.seconds === 0) {
      if (this.state.current === "Session" && this.state.sMins === 0) {
        timeLeft.classList.add("end");
        beepSound.play();
        setTimeout(() => {
          this.setState({
            current: "Break",
            sMins: this.state.session,
          });
          clearInterval(this.state.timerId);
          this.timerSwitcher(null, true);
          timeLeft.classList.remove("end");
        }, 3000);
      } else if (this.state.current === "Break" && this.state.bMins === 0) {
        timeLeft.classList.add("end");
        beepSound.play();
        setTimeout(() => {
          this.setState({
            current: "Session",
            bMins: this.state.break,
          });
          clearInterval(this.state.timerId);
          this.timerSwitcher(null, true);
          timeLeft.classList.remove("end");
        }, 3000);
      }
    }
  }
  render() {
    return (
      <div id="app">
        <h1 id="app-name">Pomodoro Timer</h1>
        <TimerOptions
          increment={this.increment}
          decrement={this.decrement}
          break={this.state.break}
          session={this.state.session}
        />
        <div className="timer">
          <TimerArea
            current={this.state.current}
            sMins={this.state.sMins}
            bMins={this.state.bMins}
            seconds={this.state.seconds}
            twoDigit={this.twoDigit}
          />
          <TimerControls
            timerSwitcher={this.timerSwitcher}
            timer={this.state.timer}
            reset={this.reset}
            beep={beep}
          />
        </div>
      </div>
    );
  }
}

export default App;
