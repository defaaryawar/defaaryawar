import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: string;
    rel?: string;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    href,
    target,
    rel,
    fullWidth = false,
    ...props
}) => {
    // Base classes shared between all variants
    const baseClasses = `
        inline-flex items-center justify-center gap-2 font-medium transition-all duration-300
        rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-60 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
    `;

    // Size classes
    const sizeClasses = {
        sm: 'py-1.5 px-3 text-sm',
        md: 'py-2 px-4 text-sm',
        lg: 'py-2.5 px-5 text-base'
    };

    // Variant classes for different button styles
    const variantClasses = {
        primary: `
            bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
            text-white shadow-sm hover:shadow
        `,
        secondary: `
            bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
            text-gray-800 dark:text-gray-200 shadow-sm
        `,
        outline: `
            bg-transparent border border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
        `,
        ghost: `
            bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
            text-gray-700 dark:text-gray-300
        `
    };

    // Combine all classes
    const buttonClasses = `
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
    `;

    // If href is provided, render as an anchor tag
    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                className={buttonClasses}
                {...props}
            >
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span>{children}</span>
            </a>
        );
    }

    // Otherwise, render as a button
    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
        </button>
    );
};

export default Button;