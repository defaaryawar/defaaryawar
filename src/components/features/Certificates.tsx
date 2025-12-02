import React from "react";
import { useLanguage } from "../hooks/LanguageContext";
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { certificatesData } from "../constants/portfolioData";

const Certificates: React.FC = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "en" ? "Certifications" : "Sertifikasi",
    credential: language === "en" ? "Credential ID" : "ID Kredensial",
    viewCertificate: language === "en" ? "View Certificate" : "Lihat Sertifikat",
    issuedOn: language === "en" ? "Issued" : "Diterbitkan",
  };

  // Get border colors for certificate cards
  const getBorderColor = (index: number) => {
    const colors = [
      "border-l-blue-500",
      "border-l-purple-500",
      "border-l-green-500",
      "border-l-amber-500",
      "border-l-rose-500",
      "border-l-cyan-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaAward className="text-amber-500 dark:text-amber-400 text-lg sm:text-xl" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {translations.title}
            </span>
          </h2>
          <div className="h-px flex-grow bg-gradient-to-r from-amber-500/50 to-transparent ml-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificatesData.map((cert, index) => {
          const borderColor = getBorderColor(index);

          return (
            <div
              key={cert.id}
              className={`rounded-lg bg-white dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${borderColor} border border-gray-100 dark:border-gray-700`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex gap-4 items-start">
                  {/* Logo */}
                  {cert.logo ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white dark:bg-gray-700 p-2 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600 shrink-0">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shadow-sm border border-amber-100 dark:border-amber-800/50 shrink-0">
                      <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-xl" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {language === "en" ? cert.title : cert.titleId || cert.title}
                    </h3>
                    <h4 className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                      {language === "en" ? cert.issuer : cert.issuerId || cert.issuer}
                    </h4>

                    <div className="flex items-center mb-2">
                      <FaCalendarAlt
                        className="mr-1.5 text-gray-500 dark:text-gray-400"
                        size={12}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{cert.date}</span>
                    </div>

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-500 dark:text-gray-400">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed line-clamp-2">
                      {language === "en"
                        ? cert.description
                        : cert.descriptionId || cert.description}
                    </p>

                    {/* Credential ID */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="font-medium">{translations.credential}: </span>
                      <span className="font-mono">{cert.credentialId}</span>
                    </div>

                    {/* View Certificate Button */}
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800 transition-colors duration-300"
                    >
                      {translations.viewCertificate}
                      <FaExternalLinkAlt className="ml-1.5" size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certificates;
