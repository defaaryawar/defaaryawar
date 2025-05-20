import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning';
    size?: 'sm' | 'md';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
    className = ''
}) => {

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';

    const variantClasses = {
        default: 'bg-github-light text-github-text',
        primary: 'bg-github-highlight bg-opacity-20 text-github-highlight',
        success: 'bg-github-success bg-opacity-20 text-github-success',
        warning: 'bg-github-warning bg-opacity-20 text-github-warning',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <span className={combinedClasses}>
            {children}
        </span>
    );
};

export default Badge;