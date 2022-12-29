import React from "react";

const TimerControls = (props) => {
  return (
    <div className="timer-controls">
      <button id="start_stop" className="start" onClick={props.timerSwitcher}>
        {!props.timer ? "Start" : "Stop"}
      </button>
      <button id="reset" onClick={props.reset}>
        Reset
      </button>
      <audio id="beep">
        <source src={props.beep}></source>
      </audio>
    </div>
  );
};

export default TimerControls;
