import React from "react";

const AuthInput = ({
  name,
  value,
  type,
  title,
  placeholder,
  onChange,
  required,
  className,
}) => {
  return (
    <div>
      <label className="sr-only">{title}</label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AuthInput;
