import React from "react";

const TimerArea = (props) => {
  return (
    <div className="timer-area">
      <h2 id="timer-label">{props.current}</h2>
      <p id="time-left">
        {`${
          props.current === "Session"
            ? props.twoDigit(props.sMins)
            : props.current === "Break"
            ? props.twoDigit(props.bMins)
            : "00"
        }:${props.twoDigit(props.seconds)}`}
      </p>
    </div>
  );
};

export default TimerArea;
