import React from 'react';
import { educationData } from '../constants/portfolioData';
import { useLanguage } from '../hooks/LanguageContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const Education: React.FC = () => {
    const { language } = useLanguage();

    const translations = {
        title: language === 'en' ? 'Education' : 'Pendidikan',
        dateFormat: (start: string, end: string) =>
            language === 'en' ? `${start} - ${end}` : `${start} s/d ${end}`
    };

    return (
        <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
            <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                        {translations.title}
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-3"></div>
                </h2>

                <div className="space-y-3 sm:space-y-4">
                    {educationData.map((edu) => (
                        <div
                            key={edu.id}
                            className="group p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden"
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="flex gap-3 items-start relative z-10">
                                {edu.logo ? (
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-white dark:bg-gray-700 p-2 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600 shrink-0 group-hover:shadow-md transition-all duration-300">
                                        <img
                                            src={edu.logo}
                                            alt={edu.institution}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                                        <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-xl group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {language === 'en' ? edu.degree : edu.degreeId || edu.degree}
                                    </h3>
                                    <h4 className="text-sm sm:text-base text-blue-600 dark:text-blue-400 mb-2">
                                        {edu.institution}
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                        <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                                            <FaCalendarAlt className="mr-1" size={10} />
                                            <span>{translations.dateFormat(edu.startDate, edu.endDate)}</span>
                                        </div>
                                        {edu.location && (
                                            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                                                <FaMapMarkerAlt className="mr-1" size={10} />
                                                <span className="truncate max-w-[150px]">{edu.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                                        {language === 'en' ? edu.description : edu.descriptionId || edu.description}
                                    </p>

                                    {(edu.field || edu.fieldId) && (
                                        <div className="mt-1 sm:mt-2">
                                            <span className="inline-block bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                                                {language === 'en' ? edu.field : edu.fieldId || edu.field}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;