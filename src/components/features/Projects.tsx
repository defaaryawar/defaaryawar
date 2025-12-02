import { useState } from "react";
import { projects } from "../constants/portfolioData";
import { useLanguage } from "../hooks/LanguageContext";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaRocket,
  FaTimes,
  FaExpand,
  FaClock,
} from "react-icons/fa";

const Projects = () => {
  const { language } = useLanguage();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const translations = {
    title: language === "en" ? "Featured Projects" : "Proyek Unggulan",
    demo: language === "en" ? "Live Demo" : "Demo Langsung",
    sourceCode: language === "en" ? "Source Code" : "Kode Sumber",
    comingSoon: language === "en" ? "Coming Soon" : "Segera Hadir",
    tech: language === "en" ? "Technologies" : "Teknologi",
    clickToExpand: language === "en" ? "Click to expand" : "Klik untuk memperbesar",
    close: language === "en" ? "Close" : "Tutup",
  };

  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <section className="py-6 px-2 sm:px-4 max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center">
          <FaRocket className="text-blue-600 dark:text-blue-400 mr-2 text-lg sm:text-xl" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent pb-1">
              {translations.title}
            </span>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-2 sm:ml-3"></div>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-lg bg-white dark:bg-gray-800/90 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            {/* Project Image Container with Aspect Ratio */}
            <div className="relative pt-[56.25%]">
              {" "}
              {/* 16:9 Aspect Ratio */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={language === "en" ? project.title : project.titleId}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />

                {/* Expand Image Button - Fixed with larger hit area and higher z-index */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleImageClick(project.image);
                  }}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors z-20"
                  title={translations.clickToExpand}
                  aria-label={translations.clickToExpand}
                >
                  <FaExpand size={14} />
                </button>

                {/* Permanent Gradient Overlay - Reduced opacity and z-index */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 z-10"></div>

                {/* Project Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg">
                    {language === "en" ? project.title : project.titleId}
                  </h3>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-3 sm:p-4 flex-grow flex flex-col">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 flex-grow leading-relaxed">
                {language === "en" ? project.description : project.descriptionId}
              </p>

              {/* Technologies */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center">
                  <FaLayerGroup className="mr-1" size={10} />
                  {translations.tech}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-2 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-2 mt-auto">
                {project.demoLink ? (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm rounded-md transition-all duration-300 flex items-center justify-center"
                  >
                    <FaExternalLinkAlt className="mr-1" size={10} />
                    {translations.demo}
                  </a>
                ) : (
                  <div className="flex-1 text-center py-1.5 px-2 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs sm:text-sm rounded-md flex items-center justify-center cursor-not-allowed">
                    <FaClock className="mr-1" size={10} />
                    {translations.comingSoon}
                  </div>
                )}

                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-2 bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs sm:text-sm rounded-md transition-colors duration-300 flex items-center justify-center"
                  >
                    <FaGithub className="mr-1" size={10} />
                    {translations.sourceCode}
                  </a>
                ) : (
                  <div className="flex-1 text-center py-1.5 px-2 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs sm:text-sm rounded-md flex items-center justify-center cursor-not-allowed">
                    <FaClock className="mr-1" size={10} />
                    {translations.comingSoon}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for expanded image */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <img
              src={expandedImage}
              alt="Expanded view"
              className="w-full h-auto max-h-[90vh] object-contain rounded"
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                closeExpandedImage();
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
              title={translations.close}
              aria-label={translations.close}
            >
              <FaTimes size={16} />
            </button>
          </div>
          <div className="absolute bottom-4 text-white text-sm opacity-80">
            {translations.close}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
