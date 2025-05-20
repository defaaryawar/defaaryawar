// Type definitions for Sidebar component
export interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    isMobile: boolean;
}

// Type definitions for MainContent component
export interface MainContentProps {
    isMobile: boolean;
    sidebarCollapsed: boolean;
    children: React.ReactNode;
}

// Type definitions for AI response service (for actual implementation)
export interface AIResponse {
    message: string;
    timestamp: Date;
}

export interface AIService {
    sendQuestion: (question: string) => Promise<AIResponse>;
    getConversationHistory: () => Promise<Message[]>;
}

// Import types from component files
// Import types from component files
import type { Message, AIChatComponentProps } from '../ai/components/AIChatComponent';
import type { AIChatButtonProps } from '../ai/AIChat';

// Re-export imported types
export type { Message, AIChatComponentProps, AIChatButtonProps };