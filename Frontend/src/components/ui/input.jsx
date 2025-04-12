import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type = 'text', placeholder, className, ...props }) => {
  const baseStyles = 'px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full';

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseStyles} ${className || ''}`}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
