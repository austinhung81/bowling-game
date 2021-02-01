import React from "react";
import "./index.scss";

type Props = {
  [key: string]: any;
}

const Button = ({ children, ...rest }: Props): JSX.Element => {
  return (
    <button type="button" className="btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;