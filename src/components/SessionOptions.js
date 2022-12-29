import React from "react";

const SessionOptions = (props) => {
  return (
    <div id="session-option">
      <h2 id="session-label">Session Length</h2>
      <div className="session-controls">
        <button
          id="session-decrement"
          className="down"
          onClick={props.decrement}
        ></button>
        <span id="session-length">{props.session}</span>
        <button
          id="session-increment"
          className="up"
          onClick={props.increment}
        ></button>
      </div>
    </div>
  );
};

export default SessionOptions;
