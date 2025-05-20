import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'success' | 'warning' | 'highlight';
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    label,
    showValue = true,
    size = 'md',
    color = 'default',
    className = '',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const baseClasses = 'w-full bg-github-light rounded-full overflow-hidden';

    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const colorClasses = {
        default: 'bg-github-highlight',
        success: 'bg-github-success',
        warning: 'bg-github-warning',
        highlight: 'bg-github-highlight',
    };

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-1 text-sm">
                    <span className="text-github-text">{label}</span>
                    {showValue && <span className="text-github-text">{percentage.toFixed(0)}%</span>}
                </div>
            )}
            <div className={combinedClasses}>
                <motion.div
                    className={`${colorClasses[color]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;