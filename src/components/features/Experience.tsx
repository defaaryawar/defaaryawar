import React from "react";
import { experience } from "../constants/portfolioData";
import { useLanguage } from "../hooks/LanguageContext";
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const Experience: React.FC = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "en" ? "Work Experience" : "Pengalaman Kerja",
    present: language === "en" ? "Present" : "Sekarang",
    achievements: language === "en" ? "Key Achievements" : "Pencapaian Utama",
  };

  return (
    <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaBriefcase className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {translations.title}
            </span>
          </h2>
          <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-2"></div>
        </div>
      </div>

      <div className="space-y-4">
        {experience.map((job, _index) => (
          <div
            key={job.id}
            className="group relative rounded-lg bg-white dark:bg-gray-800/90 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] group-hover:animate-[shimmer_2s_linear_infinite]"></div>

            <div className="p-4 sm:p-5">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
                    {language === "en" ? job.title : job.titleId || job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {job.company}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                    <FaCalendarAlt size={10} />
                    <span>
                      {job.startDate} -{" "}
                      {language === "en"
                        ? job.endDate
                        : job.endDate === "Present"
                        ? translations.present
                        : job.endDate}
                    </span>
                  </div>

                  {job.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                      <FaMapMarkerAlt size={10} />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {language === "en" ? job.description : job.descriptionId || job.description}
              </p>

              {/* Achievements Section */}
              {job.achievements && job.achievements.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <h5 className="text-xs sm:text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                    {translations.achievements}
                  </h5>

                  <div className="space-y-2">
                    {(language === "en"
                      ? job.achievements
                      : job.achievementsId || job.achievements
                    ).map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheckCircle
                          className="text-green-500 dark:text-green-400 mt-0.5 shrink-0"
                          size={12}
                        />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
            `}</style>
    </div>
  );
};

export default Experience;
