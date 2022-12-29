import React from "react";

const BreakOptions = (props) => {
  return (
    <div id="break-option">
      <h2 id="break-label">Break Length</h2>
      <div className="break-controls">
        <button
          id="break-decrement"
          className="down"
          onClick={props.decrement}
        ></button>
        <span id="break-length">{props.break}</span>
        <button
          id="break-increment"
          className="up"
          onClick={props.increment}
        ></button>
      </div>
    </div>
  );
};

export default BreakOptions;
