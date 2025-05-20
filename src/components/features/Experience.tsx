import React from 'react';
import { experience } from '../constants/portfolioData';
import { useLanguage } from '../hooks/LanguageContext';
import { FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

const Experience: React.FC = () => {
    const { language } = useLanguage();

    const translations = {
        title: language === 'en' ? 'Experience' : 'Pengalaman',
        present: language === 'en' ? 'Present' : 'Sekarang',
        achievements: language === 'en' ? 'Key Achievements' : 'Pencapaian Utama'
    };

    return (
        <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
            <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-gradient-to-r from-amber-500 to-pink-600 bg-clip-text text-transparent">
                        {translations.title}
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-amber-500/50 to-transparent ml-3"></div>
                </h2>

                <div className="relative pl-5 sm:pl-6 md:pl-8 before:absolute before:left-0 before:top-2 before:bottom-8 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:to-pink-600 before:rounded-full">
                    {experience.map((job, index) => (
                        <div key={job.id} className="mb-4 sm:mb-6 relative">
                            {/* Timeline node */}
                            <div className="absolute -left-2.5 sm:-left-3 md:-left-4 top-1.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-amber-500 dark:border-amber-400 z-10 shadow-sm"></div>

                            {/* Timeline connector (only for non-last items) */}
                            {index < experience.length - 1 && (
                                <div className="absolute -left-0.5 top-7 bottom-0 z-0">
                                    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-amber-500/30 to-pink-600/30 rounded-full"></div>
                                </div>
                            )}

                            <div className="group p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-x-1 relative overflow-hidden">
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                                            {language === 'en' ? job.title : job.titleId || job.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                                            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                                                {job.startDate} - {language === 'en' ? job.endDate : (job.endDate === 'Present' ? translations.present : job.endDate)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
                                        <h4 className="font-medium text-amber-700 dark:text-amber-400">
                                            {job.company}
                                        </h4>

                                        {job.location && (
                                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                <FaMapMarkerAlt className="mr-1" size={10} />
                                                <span className="truncate max-w-[150px]">{job.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                                        {language === 'en' ? job.description : job.descriptionId || job.description}
                                    </p>

                                    {/* Achievements */}
                                    <div className="mt-2 sm:mt-3">
                                        <h5 className="text-xs sm:text-sm font-medium mb-1.5 flex items-center text-gray-700 dark:text-gray-200">
                                            <FaTrophy className="mr-1.5 text-amber-500" size={12} />
                                            {translations.achievements}
                                        </h5>

                                        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300 pl-4">
                                            {(language === 'en' ? job.achievements : job.achievementsId || job.achievements).map((achievement, i) => (
                                                <li key={i} className="relative pl-2 before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:bg-amber-500 dark:before:bg-amber-400 before:rounded-full line-clamp-2 sm:line-clamp-none">
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-pink-600"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;