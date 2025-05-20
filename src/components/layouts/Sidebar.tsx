import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    FaGlobe
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext';
import { PiCertificateFill } from 'react-icons/pi';

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
    isMobile = false
}) => {
    // Use the language context instead of local state
    const { language, toggleLanguage } = useLanguage();
    const location = useLocation();
    const activePath = location.pathname;

    const menuItems = [
        { id: '/', label: language === 'en' ? 'Home' : 'Beranda', icon: <FaHome /> },
        { id: '/education', label: language === 'en' ? 'Education' : 'Pendidikan', icon: <FaUser /> },
        { id: '/experience', label: language === 'en' ? 'Experience' : 'Pengalaman', icon: <FaBriefcase /> },
        { id: '/certificates', label: language === 'en' ? 'Certificates' : 'Sertifikat', icon: <PiCertificateFill /> },
        { id: '/projects', label: language === 'en' ? 'Projects' : 'Proyek', icon: <FaCode /> },
        { id: '/contact', label: language === 'en' ? 'Contact' : 'Kontak', icon: <FaEnvelope /> },
    ];

    const sidebarVariants = {
        expanded: { width: '16rem' },
        collapsed: { width: '4.5rem' }
    };

    const mobileVariants = {
        open: { x: 0 },
        closed: { x: '-100%' }
    };

    return (
        <>
            {/* Mobile Top Bar (always visible on mobile) */}
            {isMobile && (
                <div className="fixed -top-0.5 left-0 w-full h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-30 md:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        aria-label="Toggle sidebar"
                    >
                        <FaBars size={20} />
                    </button>
                    <div className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {language === 'en' ? 'Portfolio' : 'Portofolio'}
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`
                    fixed top-0 left-0 h-screen z-40
                    border-r border-gray-200 dark:border-gray-700
                    shadow-sm hidden md:flex flex-col
                    transition-all duration-300
                    bg-gray-50 dark:bg-gray-800
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-700">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                        >
                            {language === 'en' ? 'Portfolio' : 'Portofolio'}
                        </motion.div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
                                    className={`
                                        flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200
                                        ${(activePath === item.id || (item.id === '/' && activePath === ''))
                                            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70'
                                        }
                                    `}
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
                                    {!isCollapsed && (activePath === item.id || (item.id === '/' && activePath === '')) && (
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
                        <div className="flex justify-between items-center">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                                <span className="ml-3 text-xs">
                                    {isDarkMode
                                        ? language === 'en' ? 'Light Mode' : 'Mode Terang'
                                        : language === 'en' ? 'Dark Mode' : 'Mode Gelap'}
                                </span>
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                aria-label="Notifications"
                            >
                                <div className="relative">
                                    <FaBell size={14} />
                                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                </div>
                                <span className="ml-3 text-xs">
                                    {language === 'en' ? 'Notifications' : 'Notifikasi'}
                                </span>
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                aria-label={language === 'en' ? 'Switch to Indonesian' : 'Ganti ke Bahasa Inggris'}
                            >
                                <FaGlobe size={14} />
                                <span className="ml-3 text-xs">
                                    {language === 'en' ? 'Indonesia' : 'English'}
                                </span>
                            </button>
                        </div>
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
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                        </button>

                        <button
                            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label="Notifications"
                        >
                            <div className="relative">
                                <FaBell size={14} />
                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            </div>
                        </button>

                        <button
                            onClick={toggleLanguage}
                            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label={language === 'en' ? 'Switch to Indonesian' : 'Ganti ke Bahasa Inggris'}
                        >
                            <FaGlobe size={14} />
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
                            {!isCollapsed ? 'DA' : 'D'}
                        </div>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="ml-2 text-xs"
                            >
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                    Defano Arya Wardhana
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {language === 'en' ? 'Web Developer' : 'Pengembang Web'}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Sidebar */}
            <motion.aside
                initial={false}
                animate={isCollapsed ? 'closed' : 'open'}
                variants={mobileVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`
                    fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-40 w-64
                    bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300
                    shadow-xl md:hidden flex flex-col
                `}
            >
                {/* Mobile Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-3">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item.id}
                                    onClick={isMobile ? toggleSidebar : undefined}
                                    className={`
                                        flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200
                                        ${(activePath === item.id || (item.id === '/' && activePath === ''))
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/30'
                                        }
                                    `}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span className="ml-3 text-sm">{item.label}</span>
                                    {(activePath === item.id || (item.id === '/' && activePath === '')) && (
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
                    <div className="flex justify-between items-center">
                        <button
                            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label="Search"
                        >
                            <FaSearch size={14} />
                            <span className="ml-3 text-xs">{language === 'en' ? 'Search' : 'Cari'}</span>
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                            <span className="ml-3 text-xs">
                                {isDarkMode
                                    ? language === 'en' ? 'Light Mode' : 'Mode Terang'
                                    : language === 'en' ? 'Dark Mode' : 'Mode Gelap'}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label="Notifications"
                        >
                            <div className="relative">
                                <FaBell size={14} />
                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            </div>
                            <span className="ml-3 text-xs">
                                {language === 'en' ? 'Notifications' : 'Notifikasi'}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center w-full px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label={language === 'en' ? 'Switch to Indonesian' : 'Ganti ke Bahasa Inggris'}
                        >
                            <FaGlobe size={14} />
                            <span className="ml-3 text-xs">
                                {language === 'en' ? 'English' : 'Indonesia'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
                            DA
                        </div>
                        <div className="ml-2 text-xs">
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                Defano Arya
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {language === 'en' ? 'Web Developer' : 'Pengembang Web'}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;