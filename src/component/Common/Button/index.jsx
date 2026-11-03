import React from "react";
import "./styles.css";

function Button({ text, outline, onClick = () => {} }) {
  return <div className={outline ? "outline-btn" : "btn"} onClick={(e) => onClick(e)} >{text}</div>;
}

export default Button;
