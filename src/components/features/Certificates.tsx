import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext';
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaShieldAlt, FaStar, FaGraduationCap } from 'react-icons/fa';
import { certificatesData } from '../constants/portfolioData';

const Certificates: React.FC = () => {
    const { language } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const translations = {
        title: language === 'en' ? 'Certifications' : 'Sertifikasi',
        credential: language === 'en' ? 'Credential ID' : 'ID Kredensial',
        viewCertificate: language === 'en' ? 'View Certificate' : 'Lihat Sertifikat',
        issuedOn: language === 'en' ? 'Issued' : 'Diterbitkan'
    };

    // Get random colors for certificate cards
    const getCardStyle = (index: number) => {
        const colors = [
            { border: 'border-l-blue-500', gradient: 'from-blue-500/20 to-transparent' },
            { border: 'border-l-purple-500', gradient: 'from-purple-500/20 to-transparent' },
            { border: 'border-l-green-500', gradient: 'from-green-500/20 to-transparent' },
            { border: 'border-l-amber-500', gradient: 'from-amber-500/20 to-transparent' },
            { border: 'border-l-rose-500', gradient: 'from-rose-500/20 to-transparent' },
            { border: 'border-l-cyan-500', gradient: 'from-cyan-500/20 to-transparent' },
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
                className="relative"
            >
                {/* Decorative elements */}
                <div className="absolute -right-8 -top-12 opacity-5 text-8xl sm:text-9xl dark:text-white hidden sm:block">
                    <FaGraduationCap />
                </div>

                <div className="absolute -left-4 bottom-10 opacity-5 text-6xl sm:text-7xl dark:text-white hidden lg:block rotate-12">
                    <FaStar />
                </div>

                <motion.h2
                    className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <FaAward className="text-amber-500 dark:text-amber-400" />
                        <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                            {translations.title}
                        </span>
                    </div>
                    <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {certificatesData.map((cert, index) => {
                        const cardStyle = getCardStyle(index);
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={cert.id}
                                className={`relative overflow-hidden rounded-lg bg-white dark:bg-gray-800/80 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${cardStyle.border} border-t border-r border-b border-gray-100 dark:border-gray-700`}
                                variants={itemVariants}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Background gradient */}
                                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${cardStyle.gradient} opacity-30 pointer-events-none`}></div>

                                {/* Decorative circles */}
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700/30 opacity-30 pointer-events-none"></div>
                                <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600/30 opacity-20 pointer-events-none"></div>

                                <div className="p-4 sm:p-5 relative z-10">
                                    <div className="flex gap-4 items-start">
                                        {/* Logo with animated border */}
                                        {cert.logo ? (
                                            <div className="relative group">
                                                <div className={`absolute inset-0 rounded-lg bg-gradient-to-tr ${isHovered ? 'from-amber-400 via-orange-500 to-amber-400' : 'from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700'} opacity-60 blur-sm transition-all duration-500`}></div>
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-white dark:bg-gray-700 p-2 sm:p-2.5 flex items-center justify-center shadow-sm relative z-10 border border-gray-200 dark:border-gray-600 shrink-0 transition-all duration-300">
                                                    <img
                                                        src={cert.logo}
                                                        alt={cert.issuer}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative group">
                                                <div className={`absolute inset-0 rounded-lg bg-gradient-to-tr ${isHovered ? 'from-amber-400 via-orange-500 to-amber-400' : 'from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700'} opacity-60 blur-sm transition-all duration-500`}></div>
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shadow-sm relative z-10 border border-amber-100 dark:border-amber-800/50 shrink-0">
                                                    <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-xl sm:text-2xl" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
                                                {language === 'en' ? cert.title : cert.titleId || cert.title}
                                            </h3>
                                            <h4 className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                                                {language === 'en' ? cert.issuer : cert.issuerId || cert.issuer}
                                            </h4>

                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                                                    <FaCalendarAlt className="mr-1.5 text-amber-500 dark:text-amber-400" size={12} />
                                                    <span className="text-xs text-amber-700 dark:text-amber-300">{cert.date}</span>
                                                </div>
                                            </div>

                                            {/* Skills with colorful tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {cert.skills && cert.skills.slice(0, 3).map((skill, skillIndex) => {
                                                    // Alternate colors for skills
                                                    const skillColors = [
                                                        "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300",
                                                        "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300",
                                                        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300",
                                                        "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300",
                                                        "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
                                                    ];
                                                    const colorClass = skillColors[skillIndex % skillColors.length];

                                                    return (
                                                        <span
                                                            key={skillIndex}
                                                            className={`inline-block ${colorClass} px-2 py-0.5 rounded-full text-xs font-medium`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    );
                                                })}
                                                {cert.skills && cert.skills.length > 3 && (
                                                    <span className="inline-block bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        +{cert.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description with fade-in effect on hover */}
                                            <div className="relative overflow-hidden">
                                                <p className={`text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed line-clamp-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
                                                    {language === 'en' ? cert.description : cert.descriptionId || cert.description}
                                                </p>
                                            </div>

                                            {/* Credential ID with monospace font */}
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                                                <span className="font-medium font-sans">{translations.credential}:</span>
                                                <span className="truncate inline-block max-w-full ml-1">{cert.credentialId}</span>
                                            </div>

                                            {/* View Certificate Button with animated gradient on hover */}
                                            <div className="mt-2">
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`
                                                        inline-flex items-center px-3 py-2 
                                                        text-xs font-medium rounded-lg 
                                                        transition-all duration-300
                                                        ${isHovered
                                                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 shadow-sm'
                                                        }
                                                    `}
                                                >
                                                    {translations.viewCertificate}
                                                    <FaExternalLinkAlt className={`ml-1.5 ${isHovered ? 'animate-pulse' : 'opacity-70'}`} size={10} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default Certificates;