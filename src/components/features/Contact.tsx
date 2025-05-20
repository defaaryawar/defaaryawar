import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import type { ReactNode } from 'react';

// Define the contact info type
type ContactInfo = {
    id: string;
    icon: ReactNode;
    title: string;
    value: string;
    action?: () => void; // Using function for window.location.href instead of direct link
    link?: string; // Keep this for non-WhatsApp links
    bgColor: string;
    hoverBgColor: string;
    borderColor: string;
    textColor: string;
};

const Contact = () => {
    const { language } = useLanguage();

    const translations = {
        title: language === 'en' ? 'Contact Me' : 'Hubungi Saya',
        subtitle: language === 'en'
            ? 'Feel free to reach out to me through any of these channels'
            : 'Jangan ragu untuk menghubungi saya melalui salah satu dari saluran berikut',
        whatsapp: language === 'en' ? 'WhatsApp' : 'WhatsApp',
        email: language === 'en' ? 'Email' : 'Email',
        instagram: language === 'en' ? 'Instagram' : 'Instagram',
        linkedin: language === 'en' ? 'LinkedIn' : 'LinkedIn',
        location: language === 'en' ? 'Location' : 'Lokasi',
        locationValue: language === 'en' ? 'Jakarta, Indonesia' : 'Jakarta, Indonesia',
    };

    // WhatsApp handler function using window.location.href like your friend's code
    const handleWhatsAppClick = () => {
        const whatsappText = language === 'en'
            ? 'Hello, I would like to know more about you.'
            : 'Halo, saya tertarik untuk tau lebih lanjut tentang Anda.';
        window.open(`https://wa.me/6281219147116?text=${encodeURIComponent(whatsappText)}`, '_blank');
    };

    // Contact information with updated WhatsApp approach using window.location.href
    const contactInfo: ContactInfo[] = [
        {
            id: 'whatsapp',
            icon: <FaWhatsapp className="text-green-500" />,
            title: translations.whatsapp,
            value: '+62 812-1914-7116',
            action: handleWhatsAppClick, // Using function instead of direct link
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            hoverBgColor: 'group-hover:bg-green-100 dark:group-hover:bg-green-900/40',
            borderColor: 'border-green-100 dark:border-green-800/50',
            textColor: 'text-green-700 dark:text-green-300'
        },
        {
            id: 'email',
            icon: <FaEnvelope className="text-red-500" />,
            title: translations.email,
            value: 'defadefa1313@gmail.com',
            link: 'mailto:defadefa1313@gmail.com',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            hoverBgColor: 'group-hover:bg-red-100 dark:group-hover:bg-red-900/40',
            borderColor: 'border-red-100 dark:border-red-800/50',
            textColor: 'text-red-700 dark:text-red-300'
        },
        {
            id: 'instagram',
            icon: <FaInstagram className="text-purple-500" />,
            title: translations.instagram,
            value: 'defaaryawar_13',
            link: 'https://instagram.com/defaaryawar_13',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            hoverBgColor: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40',
            borderColor: 'border-purple-100 dark:border-purple-800/50',
            textColor: 'text-purple-700 dark:text-purple-300'
        },
        {
            id: 'linkedin',
            icon: <FaLinkedin className="text-blue-500" />,
            title: translations.linkedin,
            value: 'Defano Arya Wardhana',
            link: 'https://linkedin.com/in/defano-arya-wardhana-50ab11328',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            hoverBgColor: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40',
            borderColor: 'border-blue-100 dark:border-blue-800/50',
            textColor: 'text-blue-700 dark:text-blue-300'
        },
        {
            id: 'location',
            icon: <FaMapMarkerAlt className="text-gray-500" />,
            title: translations.location,
            value: translations.locationValue,
            link: 'https://maps.google.com/?q=Jakarta,Indonesia',
            bgColor: 'bg-gray-50 dark:bg-gray-800/50',
            hoverBgColor: 'group-hover:bg-gray-100 dark:group-hover:bg-gray-700/70',
            borderColor: 'border-gray-100 dark:border-gray-700',
            textColor: 'text-gray-700 dark:text-gray-300'
        }
    ];

    return (
        <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
            <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                        {translations.title}
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-3"></div>
                </h2>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                    {translations.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {contactInfo.map((info) => {
                        // Create content inside the card
                        const cardContent = (
                            <>
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="flex gap-3 items-start relative z-10">
                                    <div className={`w-8 h-8 rounded-md ${info.bgColor} flex items-center justify-center shrink-0 ${info.hoverBgColor} transition-colors duration-300 border ${info.borderColor}`}>
                                        <span className="text-xs">{info.icon}</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            {info.title}
                                        </h3>
                                        <p className={`text-sm font-semibold ${info.textColor} truncate`}>
                                            {info.value}
                                        </p>
                                    </div>
                                </div>
                            </>
                        );

                        if (info.id === 'location') {
                            // Don't add link for location if you don't want it clickable
                            return (
                                <div
                                    key={info.id}
                                    className="group p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden"
                                >
                                    {cardContent}
                                </div>
                            );
                        } else if (info.id === 'whatsapp') {
                            // Special handler for WhatsApp using window.location.href
                            return (
                                <button
                                    key={info.id}
                                    onClick={info.action}
                                    className="group p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden cursor-pointer text-left w-full"
                                    aria-label={`Contact via ${info.title}`}
                                >
                                    {cardContent}
                                </button>
                            );
                        } else {
                            // For other contact methods (email, LinkedIn, Instagram)
                            return (
                                <a
                                    key={info.id}
                                    href={info.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden"
                                    aria-label={`Contact via ${info.title}`}
                                >
                                    {cardContent}
                                </a>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Contact;