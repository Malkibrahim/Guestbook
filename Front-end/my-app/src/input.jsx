import React, { Component } from "react";

const Input = (props) => {
  const { name, label, value, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
        id={name}
        name={name}
      />
    </div>
  );
};

export default Input;
