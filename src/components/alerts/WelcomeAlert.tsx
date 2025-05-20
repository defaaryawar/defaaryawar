// components/WelcomeAlert.tsx
import React, { useEffect, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'lastWelcomeAlertTime';

const WelcomeAlert: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
    const [visible, setVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const lastShown = localStorage.getItem(STORAGE_KEY);
        const now = new Date().getTime();
        const FOUR_HOURS = 4 * 60 * 60 * 1000;

        if (!lastShown || now - parseInt(lastShown) > FOUR_HOURS) {
            setVisible(true);
            localStorage.setItem(STORAGE_KEY, now.toString());

            // Auto-hide after 10 seconds
            const timeout = setTimeout(() => {
                handleClose();
            }, 10000);
            return () => clearTimeout(timeout);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setVisible(false);
        }, 400); // Match the duration of the exit animation
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed top-6 right-6 z-[100] px-5 py-4 rounded-xl shadow-lg flex items-start space-x-3 max-w-sm transition-all duration-400 ease-out ${
                isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'
            } ${
                isDarkMode 
                    ? 'bg-indigo-900 text-indigo-50 shadow-indigo-900/20' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-600/20'
            }`}
        >
            <div className="flex-shrink-0 mt-1">
                <MessageCircle size={20} className="text-indigo-200" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">
                    Chat dengan Defano
                </h4>
                <p className="text-sm opacity-90">
                    Kamu bisa tanya <strong>Defano</strong> lewat asistennya sekarang!
                    Klik logo pesan di kanan bawah ya!
                </p>
            </div>
            <button
                onClick={handleClose}
                className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                    isDarkMode 
                        ? 'hover:bg-indigo-800 text-indigo-200 hover:text-white' 
                        : 'hover:bg-blue-400/20 text-blue-100 hover:text-white'
                }`}
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default WelcomeAlert;