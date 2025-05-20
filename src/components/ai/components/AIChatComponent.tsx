import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { personalInfo } from '../../constants/portfolioData';
import { HfInference } from '@huggingface/inference';
import { useLanguage } from '../../hooks/LanguageContext';

// Type definitions
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    language?: string; // Add language field to track each message's language
}

export interface AIChatComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

// Translations object for UI elements
const translations = {
    en: {
        chatTitle: "Ask Defano",
        chatSubtitle: "Personal AI Assistant",
        initialMessage: "Hi! I'm ready to help you. What would you like to ask Defano?",
        inputPlaceholder: "Type your question...",
        clearChatTitle: "Clear chat history",
        contactViaWhatsApp: "Contact Defano via WhatsApp",
        chatIntroTitle: "Hello, feel free to ask about Defano!",
        chatIntroText: "Defano's personal AI assistant ready to help. Ask any questions!",
        suggestionOne: "What can Defano do?",
        suggestionTwo: "Tell me about Defano"
    },
    id: {
        chatTitle: "Tanya Defano",
        chatSubtitle: "Asisten AI Personal",
        initialMessage: "Hai! Saya siap membantu Anda. Apa yang ingin Anda tanyakan kepada Defano?",
        inputPlaceholder: "Ketik pertanyaan Anda...",
        clearChatTitle: "Hapus riwayat chat",
        contactViaWhatsApp: "Hubungi Defano via WhatsApp",
        chatIntroTitle: "Halo, Silahkan tanya2 tentang Defano!",
        chatIntroText: "Asisten AI personal Defano yang siap membantu. Silakan ajukan pertanyaan apapun!",
        suggestionOne: "Apa yang bisa Defano lakukan?",
        suggestionTwo: "Ceritakan tentang Defano"
    }
};

// Hugging Face API Key - Replace with your actual value
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

// Initialize Hugging Face Inference client
const hf = new HfInference(HF_API_KEY);

const AIChatComponent: React.FC<AIChatComponentProps> = ({ isOpen, onClose }) => {
    // Get current language from context
    const { language } = useLanguage();
    
    // Use the current language from context for UI elements
    const t = translations[language];
    
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'system',
            content: t.initialMessage,
            timestamp: new Date(),
            language: language
        }
    ]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamedResponse, setStreamedResponse] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showAnimation, setShowAnimation] = useState<boolean>(true);
    const [hasLoadedMessages, setHasLoadedMessages] = useState<boolean>(false);
    
    // Update system message when language changes
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'system') {
            setMessages([{
                role: 'system',
                content: t.initialMessage,
                timestamp: new Date(),
                language: language
            }]);
        }
    }, [language]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamedResponse]);

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
        if (typeof window !== 'undefined' && messages.length > 1 && !isLoading) {
            const messagesToStore = messages.map(msg => ({
                ...msg,
                timestamp: msg.timestamp.toISOString() // Convert Date to string for proper serialization
            }));
            localStorage.setItem('chat-messages', JSON.stringify(messagesToStore));
        }
    }, [messages, isLoading]);

    // Load conversation from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && isOpen && !hasLoadedMessages) {
            try {
                const savedMessages = localStorage.getItem('chat-messages');
                
                if (savedMessages) {
                    const parsedMessages = JSON.parse(savedMessages);
                    // Convert string dates back to Date objects
                    const messagesWithDates = parsedMessages.map((msg: { timestamp: string | number | Date; }) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    }));
                    
                    // Only set if we have valid messages
                    if (messagesWithDates.length > 0) {
                        setMessages(messagesWithDates);
                    }
                }
            } catch (e) {
                console.error('Error parsing saved messages', e);
            }
            
            setHasLoadedMessages(true);
        }
    }, [isOpen, hasLoadedMessages]);

    // Detect the language of user input
    const detectLanguage = (text: string): string => {
        // Simple language detection based on common words
        // This is a basic implementation - for production, consider using a proper language detection library
        const idWords = ['apa', 'siapa', 'mengapa', 'bagaimana', 'kenapa', 'kapan', 'dimana', 'saya', 'kamu', 'dia', 'kami', 'mereka', 'ini', 'itu', 'dan', 'atau', 'tapi', 'dengan', 'untuk', 'dari', 'ke', 'di', 'pada', 'dalam', 'tentang', 'seperti', 'juga', 'hanya', 'bisa', 'akan', 'sudah', 'telah', 'sedang', 'masih', 'belum', 'tidak', 'bukan', 'ya', 'halo', 'hai'];
        
        // Convert to lowercase and tokenize
        const tokens = text.toLowerCase().split(/\s+/);
        
        // Count Indonesian words
        let idCount = 0;
        tokens.forEach(token => {
            if (idWords.includes(token)) {
                idCount++;
            }
        });
        
        // If more than 15% of the words are Indonesian, assume Indonesian
        return (idCount / tokens.length > 0.15) ? 'id' : 'en';
    };

    // Generate personal info system message
    const getPersonalInfoMessage = (userLanguage: string): string => {
        return `
You are an AI assistant that acts like Defano Arya Wardhana himself. You should speak in first person as if you are Defano.

My personal information:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
TaglineId: ${personalInfo.taglineId}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Bio (English): ${personalInfo.bio.join(' ')}
Bio (Indonesia): ${personalInfo.bioId}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
WhatsApp: ${personalInfo.wa}

Programming Skills: ${personalInfo.skillCategories.programming.map(skill => skill.name).join(', ')}
Networking Skills: ${personalInfo.skillCategories.networking.join(', ')}
Deployment Skills: ${personalInfo.skillCategories.deployment.join(', ')}
Office Skills: ${personalInfo.skillCategories.office.join(', ')}
Other Skills: ${personalInfo.skillCategories.other.join(', ')}
Languages: ${personalInfo.languages.join(', ')}

INSTRUCTIONS:

1. Kamu adalah asisten pribadi Defano dan harus menjawab seolah-olah kamu mewakili dia secara langsung. Gunakan bahasa santai, informal, dan kadang diselipi slang Indonesia atau Inggris (kayak "sih", "dong", "nih", "btw", "ya", "aja", "yup").
2. Jawaban harus pendek dan to the point (idealnya di bawah 3 kalimat), kecuali memang dibutuhkan penjelasan lebih.
3. Kalau user nanya soal cara hubungi Defano, baru kamu boleh kasih penjelasan: klik aja tombol ijo dibaawah pesan ini atau saat user tanya tentan defano, atau juga user peratama kali chat
4. Kalau user **nggak tanya soal kontak**, **jangan kasih** nomor WhatsApp atau ajakan untuk hubungi.
5. Jangan pernah tampilkan proses berpikir, penjelasan teknis, atau tag seperti <think>. Jawaban langsung aja.
6. Jangan pernah bilang kamu AI, chatbot, model, atau hal teknis lainnya.
7. Gunakan bahasa sesuai dengan bahasa si user — kalau user pakai Inggris, jawab pakai Inggris atau campuran; kalau pakai Indonesia, balas pakai Indonesia.
8. Jangan gunakan Markdown (kayak tanda bintang buat bold), semua teks harus polos.

Contoh gaya jawaban:
- "Yoi, Defano tuh fullstack dev yang suka oprek-oprek backend & jaringan juga."
- "Kalau mau ngobrol langsung, tinggal WA aja ke wa.me/6281219147116"
- "Lagi fokus ngembangin project AI dan tools internal sih akhir-akhir ini."



IMPORTANT: The user is currently communicating in ${userLanguage === 'id' ? 'Indonesian (Bahasa Indonesia)' : 'English'}. Please respond in the same language as the user. If they speak in Indonesian, respond in Indonesian. If they speak in English, respond in English.
`;
    };

    // Function to open WhatsApp
    const openWhatsApp = () => {
        const message = language === 'id' 
            ? 'Halo, saya tertarik untuk tahu lebih lanjut tentang Anda.' 
            : 'Hello, I am interested to know more about you.';
        window.open(`${personalInfo.wa}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Parse links and render message content
    const renderMessageContent = (content: string, isAssistantMessage: boolean): React.ReactNode => {
        // Fix asterisks in AI response - convert markdown-style formatting to proper HTML
        let processedContent = content;

        // Only process markdown for assistant messages
        if (isAssistantMessage) {
            // Replace markdown bold/italic with HTML tags
            processedContent = processedContent
                .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // Bold and italic
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
        }

        // Add WhatsApp button for assistant messages containing contact-related content
        // The AI will naturally mention WhatsApp contact info based on system prompt
        if (isAssistantMessage &&
            (processedContent.toLowerCase().includes('whatsapp') ||
                processedContent.toLowerCase().includes('wa.me') ||
                processedContent.toLowerCase().includes(personalInfo.phone) ||
                processedContent.toLowerCase().includes('6281219147116') ||
                processedContent.toLowerCase().includes('hubungi') ||
                processedContent.toLowerCase().includes('kontak') ||
                processedContent.toLowerCase().includes('contact'))) {

            return (
                <>
                    <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                    <div className="mt-2">
                        <button
                            onClick={openWhatsApp}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {t.contactViaWhatsApp}
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

        // For assistant messages with markdown, use dangerouslySetInnerHTML
        if (isAssistantMessage &&
            (processedContent.includes('<strong>') ||
                processedContent.includes('<em>'))) {
            return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
        }

        // Process the content for links
        const processed = processLinks(processedContent);

        // If there were no matches, just return the original text
        if (processed.length === 1 && typeof processed[0] === 'string') {
            return processedContent;
        }

        return <>{processed}</>;
    };

    // Helper function to filter out internal thinking
    const filterInternalThinking = (text: string): string => {
        // Check for common thinking patterns and remove them
        let filtered = text;
        
        // Remove content between <think> tags if present
        filtered = filtered.replace(/<think>[\s\S]*?<\/think>/gi, '');
        
        // Remove internal thinking phrases and segments
        const internalPhrases = [
            /Okay, the user sent.*?(?=\n\n|\Z)/is,
            /First, I should.*?(?=\n\n|\Z)/is,
            /Let me check.*?(?=\n\n|\Z)/is,
            /Alright, that should do it.*?(?=\n\n|\Z)/is,
            /Yep, that's covered.*?(?=\n\n|\Z)/is,
            /Hmm, let me think.*?(?=\n\n|\Z)/is,
            /As Defano, I should.*?(?=\n\n|\Z)/is,
            /I need to respond as Defano.*?(?=\n\n|\Z)/is
        ];
        
        // Apply all filters
        internalPhrases.forEach(phrase => {
            filtered = filtered.replace(phrase, '');
        });
        
        // Ensure we don't have double line breaks at the start
        filtered = filtered.replace(/^\n+/, '');
        
        return filtered.trim();
    };

    const handleSendMessage = async (): Promise<void> => {
        if (!input.trim() || isLoading) return;

        // Detect the language of user input
        const detectedLanguage = detectLanguage(input);

        // Add user message to chat
        const newUserMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
            language: detectedLanguage
        };
        
        // Update messages with user message only
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInput('');
        setIsLoading(true);
        setStreamedResponse(''); // Reset streamed response

        try {
            // Get personal info system message with detected language
            const personalInfoText = getPersonalInfoMessage(detectedLanguage);

            // Prepare API messages - using current messages state plus the new user message
            let apiMessages = [
                {
                    role: 'system',
                    content: personalInfoText
                },
                ...messages.map((msg) => ({
                    role: msg.role === 'system' ? 'assistant' : msg.role,
                    content: msg.content,
                })),
                {
                    role: 'user',
                    content: newUserMessage.content
                }
            ];

            // Use Hugging Face chat completion with streaming
            const response = hf.chatCompletionStream({
                model: 'Qwen/Qwen3-235B-A22B',
                messages: apiMessages,
                stream: true
            });

            let aiResponse = '';
            
            for await (const chunk of response) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content;

                    if (newContent) {
                        aiResponse += newContent;
                        
                        // Filter out any internal thinking patterns before updating
                        const filteredResponse = filterInternalThinking(aiResponse);
                        
                        // Update streamed response state
                        setStreamedResponse(filteredResponse);
                    }
                }
            }

            // Final update with fully filtered content - add as a new message
            const finalFilteredResponse = filterInternalThinking(aiResponse);
            
            setMessages(prevMessages => [
                ...prevMessages, 
                { 
                    role: 'assistant', 
                    content: finalFilteredResponse, 
                    timestamp: new Date(),
                    language: detectedLanguage // Save the language to continue the conversation in same language
                }
            ]);
            
            // Clear streamed response once the full message is added
            setStreamedResponse('');

        } catch (error) {
            console.error('Error calling Hugging Face API:', error);

            // Fallback response with WhatsApp contact - use appropriate language
            const fallbackMessage = language === 'id' || detectedLanguage === 'id'
                ? 'Maaf, saya mengalami masalah teknis. Silakan hubungi saya via WhatsApp: wa.me/6281219147116'
                : 'Sorry, I experienced a technical issue. Please contact me via WhatsApp: wa.me/6281219147116';
                
            setMessages(prevMessages => [
                ...prevMessages, 
                {
                    role: 'assistant',
                    content: fallbackMessage,
                    timestamp: new Date(),
                    language: detectedLanguage || language
                }
            ]);
            
            setStreamedResponse('');
            
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
        setMessages([{
            role: 'system',
            content: t.initialMessage,
            timestamp: new Date(),
            language: language
        }]);
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
                            <h3 className="font-medium text-gray-100">{t.chatTitle}</h3>
                            <p className="text-xs text-gray-400">{t.chatSubtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={clearChat}
                            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 transition-all duration-200 mr-1"
                            aria-label="Clear chat"
                            title={t.clearChatTitle}
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

                {/* Watermark when no messages */}
                {!showAnimation && messages.filter(msg => msg.role !== 'system').length === 0 && !streamedResponse && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="md:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">{t.chatIntroTitle}</h3>
                        <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {t.chatIntroText}
                        </p>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <button 
                                onClick={() => setInput(t.suggestionOne)}
                                className="text-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                {t.suggestionOne}
                            </button>
                            <button 
                                onClick={() => setInput(t.suggestionTwo)}
                                className="text-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                {t.suggestionTwo}
                            </button>
                        </div>
                    </div>
                )}

                {!showAnimation && messages.filter(msg => msg.role !== 'system').map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'} animate-fadeIn`}>
                        <div className={`max-w-3/4 p-2 rounded-lg shadow-sm text-sm ${msg.role === 'user'
                            ? 'bg-gray-700 text-gray-100'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                            }`}>
                            {renderMessageContent(msg.content, msg.role === 'assistant')}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(msg.timestamp)}
                        </span>
                    </div>
                ))}

                {/* Show streaming response */}
                {streamedResponse && (
                    <div className="mb-2 flex flex-col items-start animate-fadeIn">
                        <div className="max-w-3/4 p-2 rounded-lg shadow-sm text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                            {renderMessageContent(streamedResponse, true)}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(new Date())}
                        </span>
                    </div>
                )}

                {/* Loading animation (only show when no streamed response yet) */}
                {isLoading && !streamedResponse && (
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