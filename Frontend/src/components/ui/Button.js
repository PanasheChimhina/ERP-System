import React from 'react';

const Button = ({ children, variant = 'default', ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium';
    const variantStyles = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
    };

    return (
        <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;