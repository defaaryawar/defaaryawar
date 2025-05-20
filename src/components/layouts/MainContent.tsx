import React from 'react';

interface MainContentProps {
    children: React.ReactNode;
    isMobile?: boolean;
    sidebarCollapsed?: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
    children,
    isMobile = false,
    sidebarCollapsed = false
}) => {
    return (
        <div
            className={`flex-1 transition-all duration-300 ${isMobile ? 'mt-12' : sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                }`}
        >
            {/* Main Content Area */}
            {/* Main Content Area */}
            <div className="p-4 md:p-2 max-w-7xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-800/30 border border-gray-100 dark:border-gray-700">
                    <div className="p-0 sm:p-6 md:p-8">
                        {children}
                    </div>
                </div>
            </div>


            {/* Simple Footer */}
            <footer className="mt-0 py-4 border-t dark:border-gray-800 border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainContent;