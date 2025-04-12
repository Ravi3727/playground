import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'font-medium focus:outline-none transition-colors';
  
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 hover:bg-gray-100',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };
  
  const sizes = {
    default: 'px-4 py-2 rounded',
    sm: 'px-2 py-1 text-sm rounded',
    lg: 'px-6 py-3 text-lg rounded-md',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || ''} ${sizes[size] || ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outline', 'ghost']),
  size: PropTypes.oneOf(['default', 'sm', 'lg']),
};

export {Button};
