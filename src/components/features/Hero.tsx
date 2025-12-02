import React from "react";
import { personalInfo } from "../constants/portfolioData";
import Button from "../ui/Button";
import {
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaWhatsapp,
  FaCode,
  FaNetworkWired,
  FaServer,
  FaFileAlt,
  FaTools,
  FaDatabase,
} from "react-icons/fa";
import { useLanguage } from "../hooks/LanguageContext";

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const translations = {
    contactMe: language === "en" ? "Contact Me" : "Hubungi Saya",
    githubProfile: language === "en" ? "GitHub Profile" : "Profil GitHub",
    title: language === "en" ? personalInfo.title : personalInfo.titleId || personalInfo.title,
    tagline:
      language === "en"
        ? personalInfo.tagline ||
          `${personalInfo.title} passionate about creating impactful digital experiences`
        : personalInfo.taglineId ||
          personalInfo.tagline ||
          `${personalInfo.title} yang bersemangat dalam menciptakan pengalaman digital yang berdampak`,
    bio: language === "en" ? personalInfo.bio : personalInfo.bioId || personalInfo.bio,
    techStack: language === "en" ? "Tech Stack" : "Teknologi",
    programming: language === "en" ? "Programming" : "Pemrograman",
    backendTools: language === "en" ? "Backend & Tools" : "Backend & Tools",
    databaseAndCloud: language === "en" ? "Database & Cloud" : "Database & Cloud",
    networking: language === "en" ? "Networking" : "Jaringan",
    deployment: language === "en" ? "Deployment" : "Penerapan",
    office: language === "en" ? "Office" : "Perkantoran",
    other: language === "en" ? "Other Skills" : "Keahlian Lain",
    scrollDown: language === "en" ? "Scroll down" : "Gulir ke bawah",
  };

  // Handler functions for social links
  const openWhatsApp = () => {
    const message =
      language === "en"
        ? "Hello, I would like to know more about you."
        : "Halo, saya tertarik untuk tahu lebih lanjut tentang Anda.";
    window.open(`https://wa.me/6281219147116?text=${encodeURIComponent(message)}`, "_blank");
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  // Convert bio array to string if needed
  const bioText =
    typeof translations.bio === "string"
      ? translations.bio
      : Array.isArray(translations.bio)
      ? translations.bio.join(" ")
      : "";

  return (
    <div className="py-4 px-2 sm:px-3 md:px-0 max-w-6xl">
      <div className="w-full">
        {/* Responsive layout with improved spacing */}
        <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Profile Picture with animated gradient border */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-30 blur-md group-hover:opacity-50 group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg hover:scale-105 transition-transform duration-300">
              <img
                src={personalInfo.avatar || "/api/placeholder/400/400"}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content column with improved design */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
              {translations.title}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
              {language === "en" ? "Hi, I'm" : "Halo, saya"} {personalInfo.name}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                .
              </span>
            </h1>

            <h2 className="text-sm sm:text-base md:text-lg font-medium mb-2 text-gray-600 dark:text-gray-300">
              {translations.tagline}
            </h2>

            <div className="flex items-center justify-center lg:justify-start text-xs text-gray-500 dark:text-gray-400 mb-3">
              <FaMapMarkerAlt className="mr-1" size={12} />
              {personalInfo.location}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 max-w-6xl mx-auto lg:mx-0 leading-relaxed">
              {bioText}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
              <Button
                variant="primary"
                icon={<FaGithub size={14} />}
                onClick={() => openLink(personalInfo.github)}
                className="text-xs py-1.5 px-3 rounded-lg"
              >
                {translations.githubProfile}
              </Button>

              <Button
                variant="outline"
                icon={<FaEnvelope size={14} />}
                href={`mailto:${personalInfo.email}`}
                className="text-xs py-1.5 px-3 rounded-lg"
              >
                {translations.contactMe}
              </Button>
            </div>

            {/* Social icons with improved hover effects */}
            <div className="flex justify-center lg:justify-start gap-2 mt-2">
              <button
                onClick={() => openLink(personalInfo.github)}
                className="p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </button>

              <button
                onClick={() => openLink(personalInfo.linkedin)}
                className="p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={14} />
              </button>

              <button
                onClick={openWhatsApp}
                className="p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Tech stack section with categories */}
        <div className="mt-4 sm:mt-5 pt-3 border-t border-gray-200 dark:border-gray-700/50">
          <h3 className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">
            {translations.techStack}
          </h3>

          {/* Programming Skills with logos */}
          <div className="mb-3">
            <div className="flex items-center justify-center mb-2">
              <FaCode className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {translations.programming}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {personalInfo.skillCategories?.programming?.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center px-2 py-1 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-3 h-3 mr-1.5 object-contain"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-center py-2">
            {/* Backend Tools with logos */}
            <div className="mb-3">
              <div className="flex items-center justify-center mb-2">
                <FaServer className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.backendTools}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {personalInfo.skillCategories?.backendTools?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-3 h-3 mr-1.5 object-contain"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Database & Cloud with logos */}
            <div className="mb-3">
              <div className="flex items-center justify-center mb-2">
                <FaDatabase className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.databaseAndCloud}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {personalInfo.skillCategories?.databaseAndCloud?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-3 h-3 mr-1.5 object-contain"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other skill categories without logos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Networking Skills */}
            <div>
              <div className="flex items-center justify-center mb-2">
                <FaNetworkWired className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.networking}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {personalInfo.skillCategories?.networking?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Deployment Skills */}
            <div>
              <div className="flex items-center justify-center mb-2">
                <FaServer className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.deployment}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {personalInfo.skillCategories?.deployment?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Office Skills */}
            <div>
              <div className="flex items-center justify-center mb-2">
                <FaFileAlt className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.office}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {personalInfo.skillCategories?.office?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <div className="flex items-center justify-center mb-2">
                <FaTools className="text-blue-500 dark:text-blue-400 mr-1" size={12} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {translations.other}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {personalInfo.skillCategories?.other?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
