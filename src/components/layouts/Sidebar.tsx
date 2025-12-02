import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaBars,
  FaChevronRight,
  FaMoon,
  FaSun,
  FaSearch,
  FaBell,
  FaGlobe,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/LanguageContext";
import { PiCertificateFill } from "react-icons/pi";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
  isDarkMode,
  toggleTheme,
  isMobile = false,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const activePath = location.pathname;
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: "/", label: language === "en" ? "Home" : "Beranda", icon: <FaHome /> },
    { id: "/education", label: language === "en" ? "Education" : "Pendidikan", icon: <FaUser /> },
    {
      id: "/experience",
      label: language === "en" ? "Experience" : "Pengalaman",
      icon: <FaBriefcase />,
    },
    {
      id: "/certificates",
      label: language === "en" ? "Certificates" : "Sertifikat",
      icon: <PiCertificateFill />,
    },
    { id: "/projects", label: language === "en" ? "Projects" : "Proyek", icon: <FaCode /> },
    { id: "/contact", label: language === "en" ? "Contact" : "Kontak", icon: <FaEnvelope /> },
  ];

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4.5rem" },
  };

  const mobileVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div className="fixed -top-0.5 left-0 w-full h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-30 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {language === "en" ? "Portfolio" : "Portofolio"}
            </div>
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotification}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Notifications"
              >
                <div className="relative">
                  <FaBell size={18} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </button>

              {/* Mobile Notification Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-3">
                      <h3 className="text-black/80 font-semibold">
                        {language === "en" ? "Notifications" : "Notifikasi"}
                      </h3>
                    </div>
                    <div className="w-full h-px bg-gray-300 my-0 px-4"/>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          <img src="/assets/profil/profil_defano.webp" alt="profile defano" className="rounded-full"/>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {language === "en"
                              ? "Defano is developing SoftShop"
                              : "Defano sedang develop SoftShop"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {language === "en"
                              ? "E-commerce mini project. Contact him now if you want to know about his project!"
                              : "Project e-commerce mini. Hubungi dia sekarang jika ingin tau tentang projectnya!"}
                          </p>
                          <div className="flex gap-2">
                            <a
                              href="https://wa.me/6281219147116"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1.5 bg-green-500/20 text-black/80 font-semibold rounded-md hover:bg-green-600/30 transition-colors border border-green-500"
                            >
                              WhatsApp
                            </a>
                            <a
                              href="https://www.tiktok.com/@user.deff"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1.5 bg-black/20 text-black/80 font-semibold rounded-md hover:bg-gray-800/30 transition-colors border border-black/30"
                            >
                              TikTok
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-screen z-40 border-r border-gray-200 dark:border-gray-700 shadow-sm hidden md:flex flex-col transition-all duration-300 bg-gray-50 dark:bg-gray-800"
      >
        {/* Sidebar Header with Notification */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 flex-1">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                {language === "en" ? "Portfolio" : "Portofolio"}
              </motion.div>
            )}
            {!isCollapsed && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={toggleNotification}
                  className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Notifications"
                >
                  <div className="relative">
                    <FaBell size={16} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                </button>

                {/* Desktop Notification Dropdown */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-3">
                        <h3 className="text-black/80 font-semibold">
                          {language === "en" ? "Notifications" : "Notifikasi"}
                        </h3>
                      </div>
                      <div className="w-full h-px bg-gray-300 my-0 px-4"/>
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                            <img src="/assets/profil/profil_defano.webp" alt="profile defano" className="rounded-full"/>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                              {language === "en"
                                ? "Defano is developing SoftShop"
                                : "Defano sedang develop SoftShop"}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {language === "en"
                                ? "E-commerce mini project. Contact him now if you want to know about his project!"
                                : "Project e-commerce mini. Hubungi dia sekarang jika ingin tau tentang projectnya!"}
                            </p>
                            <div className="flex gap-2">
                              <a
                                href="https://wa.me/6281219147116"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 bg-green-500/20 text-black/80 font-semibold rounded-md hover:bg-green-600/30 transition-colors border border-green-500"
                              >
                                WhatsApp
                              </a>
                              <a
                                href="https://www.tiktok.com/@user.deff"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 bg-black/20 text-black/80 font-semibold rounded-md hover:bg-gray-800/30 transition-colors border border-black/30"
                              >
                                TikTok
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaChevronRight size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    activePath === item.id || (item.id === "/" && activePath === "")
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {!isCollapsed &&
                    (activePath === item.id || (item.id === "/" && activePath === "")) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                    )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toolbar */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 space-y-1"
          >
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              <span className="ml-3 text-xs">
                {isDarkMode
                  ? language === "en"
                    ? "Light Mode"
                    : "Mode Terang"
                  : language === "en"
                  ? "Dark Mode"
                  : "Mode Gelap"}
              </span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={language === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
            >
              <FaGlobe size={14} />
              <span className="ml-3 text-xs">{language === "en" ? "Indonesia" : "English"}</span>
            </button>
          </motion.div>
        )}

        {/* Condensed Toolbar for Collapsed State */}
        {isCollapsed && (
          <div className="px-1 py-2 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center space-y-3">
            <button
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Search"
            >
              <FaSearch size={14} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>

            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={language === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
            >
              <FaGlobe size={14} />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex ${isCollapsed ? "justify-center" : "items-center"}`}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
              {!isCollapsed ? "DA" : "D"}
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 text-xs"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">Defano Arya Wardhana</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "en" ? "Web Developer" : "Pengembang Web"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? "closed" : "open"}
        variants={mobileVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-40 w-64 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-xl md:hidden flex flex-col"
      >
        {/* Mobile Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  onClick={isMobile ? toggleSidebar : undefined}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    activePath === item.id || (item.id === "/" && activePath === "")
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="ml-3 text-sm">{item.label}</span>
                  {(activePath === item.id || (item.id === "/" && activePath === "")) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toolbar Controls */}
        <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <button
            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Search"
          >
            <FaSearch size={14} />
            <span className="ml-3 text-xs">{language === "en" ? "Search" : "Cari"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            <span className="ml-3 text-xs">
              {isDarkMode
                ? language === "en"
                  ? "Light Mode"
                  : "Mode Terang"
                : language === "en"
                ? "Dark Mode"
                : "Mode Gelap"}
            </span>
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={language === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
          >
            <FaGlobe size={14} />
            <span className="ml-3 text-xs">{language === "en" ? "English" : "Indonesia"}</span>
          </button>
        </div>

        {/* Mobile Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
              DA
            </div>
            <div className="ml-2 text-xs">
              <p className="font-medium text-gray-800 dark:text-gray-200">Defano Arya</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === "en" ? "Web Developer" : "Pengembang Web"}
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
