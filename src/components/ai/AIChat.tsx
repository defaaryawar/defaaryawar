import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import AIChatComponent from './components/AIChatComponent';

// Type definition
export interface AIChatButtonProps {
    isDarkMode: boolean;
}

const AIChat: React.FC<AIChatButtonProps> = ({ isDarkMode }) => {
    // Initialize chatOpen state from localStorage if available
    const [chatOpen, setChatOpen] = useState<boolean>(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('chat-open-state');
            return saved === 'true' ? true : false;
        }
        return false;
    });

    // Update localStorage when chatOpen changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chat-open-state', chatOpen.toString());
        }
    }, [chatOpen]);

    const toggleChat = (): void => {
        setChatOpen(!chatOpen);
    };

    const closeChat = (): void => {
        setChatOpen(false);
    };

    return (
        <>
            {/* AI Chat Button - only visible when chat is closed */}
            {!chatOpen && (
                <button
                    onClick={toggleChat}
                    className={`fixed bottom-6 right-6 p-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                        } text-white rounded-full shadow-lg transition-all z-40 animate-fadeIn`}
                    aria-label="Tanya Defano"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* AI Chat Component */}
            <AIChatComponent
                isOpen={chatOpen}
                onClose={closeChat}
            />
        </>
    );
};

export default AIChat;