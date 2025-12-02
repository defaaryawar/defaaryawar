import { useLanguage } from "../hooks/LanguageContext";
import {
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTiktok, // TikTok Icon Import
} from "react-icons/fa";
import type { ReactNode } from "react";

// Define the contact info type
type ContactInfo = {
  id: string;
  icon: ReactNode;
  title: string;
  value: string;
  action?: () => void;
  link?: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
};

const Contact = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "en" ? "Get In Touch" : "Hubungi Saya",
    subtitle:
      language === "en"
        ? "Let's connect and collaborate on exciting projects together"
        : "Mari terhubung dan berkolaborasi dalam proyek yang menarik",
    whatsapp: language === "en" ? "WhatsApp" : "WhatsApp",
    email: language === "en" ? "Email" : "Email",
    instagram: language === "en" ? "Instagram" : "Instagram",
    linkedin: language === "en" ? "LinkedIn" : "LinkedIn",
    tiktok: language === "en" ? "TikTok" : "TikTok", // Add TikTok Translation
    location: language === "en" ? "Location" : "Lokasi",
    locationValue: language === "en" ? "Jakarta, Indonesia" : "Jakarta, Indonesia",
  };

  // WhatsApp handler function
  const handleWhatsAppClick = () => {
    const whatsappText =
      language === "en"
        ? "Hello, I would like to know more about you."
        : "Halo, saya tertarik untuk tau lebih lanjut tentang Anda.";
    window.open(`https://wa.me/6281219147116?text=${encodeURIComponent(whatsappText)}`, "_blank");
  };

  // Contact information with fresh color scheme
  const contactInfo: ContactInfo[] = [
    {
      id: "whatsapp",
      icon: <FaWhatsapp size={20} />,
      title: translations.whatsapp,
      value: "+62 812-1914-7116",
      action: handleWhatsAppClick,
      iconColor: "text-white",
      gradientFrom: "from-green-400",
      gradientTo: "to-green-600",
    },
    {
      id: "email",
      icon: <FaEnvelope size={18} />,
      title: translations.email,
      value: "defadefa1313@gmail.com",
      link: "mailto:defadefa1313@gmail.com",
      iconColor: "text-white",
      gradientFrom: "from-red-400",
      gradientTo: "to-red-600",
    },
    {
      id: "linkedin",
      icon: <FaLinkedin size={20} />,
      title: translations.linkedin,
      value: "Defano Arya Wardhana",
      link: "https://linkedin.com/in/defano-arya-wardhana-50ab11328",
      iconColor: "text-white",
      gradientFrom: "from-blue-400",
      gradientTo: "to-blue-600",
    },
    {
      id: "instagram",
      icon: <FaInstagram size={20} />,
      title: translations.instagram,
      value: "defaaryawar_13",
      link: "https://instagram.com/defaaryawar_13",
      iconColor: "text-white",
      gradientFrom: "from-pink-400",
      gradientTo: "to-purple-600",
    },
    {
      id: "tiktok", // TikTok Contact Added
      icon: <FaTiktok size={20} />,
      title: translations.tiktok,
      value: "@user.deff",
      link: "https://www.tiktok.com/@user.deff",
      iconColor: "text-white",
      gradientFrom: "from-black",
      gradientTo: "to-blue-400",
    },
    {
      id: "location",
      icon: <FaMapMarkerAlt size={18} />,
      title: translations.location,
      value: translations.locationValue,
      link: "https://maps.google.com/?q=Jakarta,Indonesia",
      iconColor: "text-white",
      gradientFrom: "from-gray-400",
      gradientTo: "to-gray-600",
    },
  ];

  return (
    <div className="py-6 px-3 sm:px-4 md:px-4 max-w-6xl mx-auto">
      {/* Header Section with Icon */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-3">
          <FaPaperPlane className="text-white" size={20} />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {translations.title}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {translations.subtitle}
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactInfo.map((info) => {
          const cardContent = (
            <div className="flex items-center gap-4">
              {/* Icon with gradient background */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradientFrom} ${info.gradientTo} flex items-center justify-center shrink-0 shadow-lg`}
              >
                <span className={info.iconColor}>{info.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                  {info.title}
                </h3>
                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  {info.value}
                </p>
              </div>
            </div>
          );

          if (info.id === "whatsapp") {
            return (
              <button
                key={info.id}
                onClick={info.action}
                className="group p-4 rounded-xl bg-white dark:bg-gray-800/90 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] text-left w-full"
              >
                {cardContent}
              </button>
            );
          } else {
            return (
              <a
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white dark:bg-gray-800/90 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:no-underline"
              >
                {cardContent}
              </a>
            );
          }
        })}
      </div>

      {/* Bottom decorative element */}
      <div className="mt-8 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800/50">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {language === "en"
              ? "Available for freelance opportunities"
              : "Tersedia untuk proyek freelance"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
