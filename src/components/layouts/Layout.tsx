import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AIChat from '../ai/AIChat';
import WelcomeAlert from '../alerts/WelcomeAlert';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
        setTimeout(() => setLoading(false), 300);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setSidebarCollapsed(mobile);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = (): void => setSidebarCollapsed(!sidebarCollapsed);
    const toggleTheme = (): void => setIsDarkMode(!isDarkMode);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 dark:bg-gray-900">
            <Sidebar
                isCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                isMobile={isMobile}
            />

            <MainContent
                isMobile={isMobile}
                sidebarCollapsed={sidebarCollapsed}
            >
                {children}
            </MainContent>

            {/* AI Chat Feature */}
            <AIChat isDarkMode={isDarkMode} />
            <WelcomeAlert isDarkMode={isDarkMode} />

            {isMobile && !sidebarCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default Layout;