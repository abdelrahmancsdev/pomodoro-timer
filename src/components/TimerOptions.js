import React from "react";
import BreakOptions from "./BreakOptions";
import SessionOptions from "./SessionOptions";
const TimerOptions = (props) => {
  return (
    <div className="app-options">
      <BreakOptions
        increment={props.increment}
        decrement={props.decrement}
        break={props.break}
      />
      <SessionOptions
        increment={props.increment}
        decrement={props.decrement}
        session={props.session}
      />
    </div>
  );
};

export default TimerOptions;
