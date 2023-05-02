import React from "react";

const FormField = ({
  title,
  InputType,
  type,
  name,
  value,
  placeholder,
  onChange,
  option,
  required,
}) => {
  return (
    <div>
      <label className="form__label">{title}</label>
      {InputType === "select" ? (
        <InputType
          className="form__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" hidden selected>
            Select
          </option>
          {option}
        </InputType>
      ) : (
        <InputType
          className="form__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
