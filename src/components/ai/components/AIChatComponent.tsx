import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { personalInfo } from '../../constants/portfolioData';

// Type definitions
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

export interface AIChatComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

// OpenRouter API Key and Site Info - Replace with your actual values
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL2;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

const AIChatComponent: React.FC<AIChatComponentProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'system',
            content: 'Hai! Saya siap membantu Anda. Apa yang ingin Anda tanyakan kepada Defano?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [systemMessageSent, setSystemMessageSent] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showAnimation, setShowAnimation] = useState<boolean>(true);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle textarea auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    // Entry animation
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShowAnimation(false);
            }, 800);
        } else {
            setShowAnimation(true);
        }
    }, [isOpen]);

    // Store conversation in localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && messages.length > 1) {
            localStorage.setItem('chat-messages', JSON.stringify(messages));
            // Also store systemMessageSent state
            localStorage.setItem('system-message-sent', JSON.stringify(systemMessageSent));
        }
    }, [messages, systemMessageSent]);

    // Load conversation from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && isOpen) {
            const savedMessages = localStorage.getItem('chat-messages');
            const savedSystemState = localStorage.getItem('system-message-sent');
            
            if (savedMessages) {
                try {
                    const parsedMessages = JSON.parse(savedMessages);
                    // Convert string dates back to Date objects
                    const messagesWithDates = parsedMessages.map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    }));
                    setMessages(messagesWithDates);
                } catch (e) {
                    console.error('Error parsing saved messages', e);
                }
            }
            
            if (savedSystemState) {
                try {
                    setSystemMessageSent(JSON.parse(savedSystemState));
                } catch (e) {
                    console.error('Error parsing system message state', e);
                }
            }
        }
    }, [isOpen]);

    // Parse links and make them clickable
    const renderMessageContent = (content: string): React.ReactNode => {
        // Check if content contains keywords related to contact/WhatsApp and insert WhatsApp button
        const contactKeywords = [
            'hubungi', 'kontak', 'whatsapp', 'wa', 'chat', 'tanya', 'menghubungi',
            'contact', 'reach', 'message', 'connect'
        ];
        
        // Check if the message is from the assistant and contains contact keywords
        if (contactKeywords.some(keyword => 
            content.toLowerCase().includes(keyword.toLowerCase())) && 
            !content.includes('wa.me/')) {
            
            // Add WhatsApp button for messages containing contact keywords
            return (
                <>
                    {content}
                    <div className="mt-2">
                        <button 
                            onClick={openWhatsApp}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Hubungi Defano via WhatsApp
                        </button>
                    </div>
                </>
            );
        }
        
        // Function to process links
        const processLinks = (text: string) => {
            // Match URLs, emails, and WhatsApp links
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
            
            
            // Function to process matches with a regex
            const processMatches = (regex: RegExp, text: string, type: string) => {
                let match;
                let result = [];
                let lastIdx = 0;
                
                while ((match = regex.exec(text)) !== null) {
                    if (match.index > lastIdx) {
                        result.push(text.substring(lastIdx, match.index));
                    }
                    
                    const url = match[0];
                    result.push(
                        <a 
                            key={`${type}-${match.index}`}
                            href={type === 'email' ? `mailto:${url}` : url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                // Handle WhatsApp links specially
                                if (url.includes('wa.me/')) {
                                    e.preventDefault();
                                    openWhatsApp();
                                }
                            }}
                        >
                            {url}
                        </a>
                    );
                    
                    lastIdx = match.index + match[0].length;
                }
                
                if (lastIdx < text.length) {
                    result.push(text.substring(lastIdx));
                }
                
                return result;
            };
            
            // Process in order: URLs, then emails within any text parts
            let processed = processMatches(urlRegex, text, 'url');
            
            // Now process any text nodes for emails
            let finalResult = [];
            for (let i = 0; i < processed.length; i++) {
                if (typeof processed[i] === 'string') {
                    finalResult.push(...processMatches(emailRegex, processed[i] as string, 'email'));
                } else {
                    finalResult.push(processed[i]);
                }
            }
            
            return finalResult;
        };
        
        // Process the content
        const processed = processLinks(content);
        
        // If there were no matches, just return the original text
        if (processed.length === 1 && typeof processed[0] === 'string') {
            return content;
        }
        
        return <>{processed}</>;
    };

    // Function to handle WhatsApp links correctly
    const openWhatsApp = () => {
        const message = 'Halo, saya tertarik untuk tahu lebih lanjut tentang Anda.';
        window.open(`https://wa.me/6281219147116?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleSendMessage = async (): Promise<void> => {
        if (!input.trim()) return;

        // Add user message to chat
        const newUserMessage: Message = { 
            role: 'user', 
            content: input, 
            timestamp: new Date() 
        };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare messages for API - only include system message once
            const personalInfoText = `
Information about Defano Arya Wardhana:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Bio: ${personalInfo.bio.join(' ')}
Skills: ${personalInfo.skills.join(', ')}
Languages: ${personalInfo.languages.join(', ')}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}

INSTRUCTIONS:
1. Give brief, concise answers about Defano based on the information above
2. When asked about how to contact Defano, ALWAYS recommend WhatsApp as the primary contact method
3. When users ask questions like "how can I contact you?" or "how to reach Defano", respond with something like "Cara terbaik untuk menghubungi Defano adalah melalui WhatsApp di nomor 6281219147116"
4. Keep responses under 3 sentences when possible
5. Don't mention any limitations in your responses
6. Format responses in a conversational, friendly tone
`;

            // Prepare messages for API - only include system message if not sent before
            let apiMessages = [];
            
            if (!systemMessageSent) {
                apiMessages.push({
                    role: "system",
                    content: personalInfoText
                });
                setSystemMessageSent(true);
            }
            
            // Add conversation history
            apiMessages = [
                ...apiMessages,
                ...updatedMessages.map(msg => ({
                    role: msg.role === 'system' ? 'assistant' : msg.role,
                    content: msg.content
                }))
            ];

            // Call DeepSeek AI through OpenRouter
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": SITE_URL,
                    "X-Title": SITE_NAME,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-chat:free",
                    "messages": apiMessages,
                    "max_tokens": 150 // Limit response length
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Add AI response to chat
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error("Error calling AI API:", error);
            
            // Fallback response in case of API error
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: "Maaf, saya mengalami masalah teknis. Silakan coba lagi nanti.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function to clear chat history
    const clearChat = () => {
        localStorage.removeItem('chat-messages');
        localStorage.removeItem('system-message-sent');
        setMessages([{
            role: 'system',
            content: 'Hai! Saya siap membantu Anda. Apa yang ingin Anda tanyakan kepada Defano?',
            timestamp: new Date()
        }]);
        setSystemMessageSent(false);
    };

    return (
        <div className={`fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? 'h-96 opacity-100 transform-none' : 'h-0 opacity-0 transform translate-y-10 pointer-events-none'}`}>
            {/* Header with solid color */}
            <div className="bg-gray-800 dark:bg-gray-800 rounded-t-xl">
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gray-700 rounded-full overflow-hidden">
                            <img 
                                src={personalInfo.avatar} 
                                alt="Defano Arya" 
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/40';
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-100">Tanya Defano</h3>
                            <p className="text-xs text-gray-400">Asisten AI Personal</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={clearChat}
                            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 transition-all duration-200 mr-1"
                            aria-label="Clear chat"
                            title="Hapus riwayat chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 transition-all duration-200"
                            aria-label="Close chat"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                {showAnimation && isOpen && (
                    <div className="w-full flex justify-center items-center h-full">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}

                {!showAnimation && messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'} animate-fadeIn`}>
                        <div className={`max-w-3/4 p-2 rounded-lg shadow-sm text-sm ${msg.role === 'user'
                                ? 'bg-gray-700 text-gray-100'
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                            }`}>
                            {renderMessageContent(msg.content)}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(msg.timestamp)}
                        </span>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-start mb-2">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(new Date())}
                        </span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input - Simplified without file/mic/image buttons */}
            <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 rounded-b-xl">
                <div className="flex items-end bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ketik pertanyaan Anda..."
                        className="flex-1 py-1 px-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none resize-none max-h-20 min-h-8 text-sm"
                        rows={1}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className="ml-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        aria-label="Send message"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatComponent;