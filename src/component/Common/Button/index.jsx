import React from "react";
import "./styles.css";

function Button({ text, outline, onClick }) {
  return <div className={outline ? "outline-btn" : "btn"} onClick={() => onClick()} >{text}</div>;
}

export default Button;
