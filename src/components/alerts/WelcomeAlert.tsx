import React, { useEffect, useState, useRef } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

const STORAGE_KEY = 'lastWelcomeAlertTime';

const WelcomeAlert: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
    const [visible, setVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { language } = useLanguage();

    useEffect(() => {
        const lastShown = localStorage.getItem(STORAGE_KEY);
        const now = new Date().getTime();
        const ONE_HOUR = 1 * 60 * 60 * 1000;

        if (!lastShown || now - parseInt(lastShown) > ONE_HOUR) {
            setVisible(true);
            localStorage.setItem(STORAGE_KEY, now.toString());

            timerRef.current = setTimeout(() => {
                handleClose();
            }, 10000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleClose = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsClosing(true);
        setTimeout(() => {
            setVisible(false);
        }, 100);
    };

    if (!visible) return null;

    // Texts for both languages
    const title = language === 'id' ? 'Chat dengan Defano' : 'Chat with Defano';
    const message = language === 'id'
        ? 'Kamu bisa tanya Defano lewat asistennya sekarang! Klik logo pesan di kanan bawah ya!'
        : 'You can now ask Defano anything through his assistant! Just click the message icon at the bottom right.';

    return (
        <div
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-lg flex items-start space-x-3 max-w-[90%] sm:max-w-sm transition-all duration-400 ease-out ${
                isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'
            } ${
                isDarkMode 
                    ? 'bg-gray-600 text-gray-50 shadow-gray-900/30' 
                    : 'bg-gray-300 text-gray-900 shadow-gray-700/30'
            }`}
        >
            <div className="flex-shrink-0 mt-1">
                <MessageCircle size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-800'} />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{title}</h4>
                <p className="text-xs sm:text-sm opacity-90">{message}</p>
            </div>
            <button
                onClick={handleClose}
                className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${
                    isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-200 hover:text-white' 
                        : 'hover:bg-gray-500 text-gray-800 hover:text-white'
                }`}
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default WelcomeAlert;
