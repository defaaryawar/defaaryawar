import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
    delay?: number;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    animate = true,
    delay = 0
}) => {
    const baseClasses = 'bg-github-medium border border-github-border rounded-md p-4 shadow-github';
    const combinedClasses = `${baseClasses} ${className}`;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: delay * 0.1
            }
        }
    };

    if (animate) {
        return (
            <motion.div
                className={combinedClasses}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};

export default Card;