import React from "react";
import "./index.scss";

const Button = ({ children, ...rest }) => {
  return (
    <button type="button" className="btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;