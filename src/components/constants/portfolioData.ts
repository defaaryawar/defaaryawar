// personalInfo.ts
export const personalInfo = {
    name: "Defano Arya Wardhana",
    title: "FullStack Developer | IT | Frontend Developer",
    titleId: "Pengembang FullStack | TI | Pengembang Frontend",
    tagline: "Coding yes, checking the network also works!",
    taglineId: "Ngoding iya, ngoprek jaringan juga jalan!",
    avatar: "/src/assets/profil/profil_defano.webp", // Replace with actual image path
    email: "defadefa1313@gmail.com",
    phone: "081219147116",
    location: "Tangerang Selatan, IDN",
    wa: "https://wa.me/6281219147116",
    github: "https://github.com/defaaryawar",
    linkedin: "https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/",
    bio: [
        "I am a graduate of Informatics Engineering from Budi Luhur University and Computer Network Engineering from SMK Bina Informatika.",
        "I have expertise in web development using HTML, CSS, PHP, JavaScript, and frameworks such as Tailwind CSS, Next.js, React.js, and Bootstrap.",
        "In addition, I am also experienced in troubleshooting, LAN configuration, and basic Linux commands. I have deployed projects on platforms like Vercel, Railway, and Hostinger. I continue to expand my knowledge in networking fundamentals, including basic Cisco materials."
    ],
    bioId: "Saya lulusan Teknik Informatika dari Universitas Budi Luhur dan Teknik Komputer Jaringan dari SMK Bina Informatika. Saya memiliki keahlian dalam pengembangan web menggunakan HTML, CSS, PHP, JavaScript, serta framework seperti Tailwind CSS, Next.js, React.js, dan Bootstrap.\n Selain itu, saya juga berpengalaman dalam troubleshooting, konfigurasi LAN, dan perintah dasar Linux. Saya telah men-deploy proyek di platform seperti Vercel, Railway, dan Hostinger. Saya terus memperluas pengetahuan saya dalam dasar-dasar jaringan, termasuk materi dasar Cisco.",

    // Skills categorized with logos for programming skills
    skillCategories: {
        programming: [
            { name: "React", logo: "/src/assets/skills/react.png" },
            { name: "TypeScript", logo: "/src/assets/skills/typescript.png" },
            { name: "Next.js", logo: "/src/assets/skills/nextjs.png" },
            { name: "Node.js", logo: "/src/assets/skills/nodejs.png" },
            { name: "HTML5", logo: "/src/assets/skills/html.png" },
            { name: "CSS", logo: "/src/assets/skills/css.png" },
            { name: "JavaScript", logo: "/src/assets/skills/javascript.png" },
            { name: "TailwindCSS", logo: "/src/assets/skills/tailwindcss.png" },
            { name: "PostgreSQL", logo: "/src/assets/skills/postgresql.png" },
            { name: "Firebase", logo: "/src/assets/skills/firebase.png" },
        ],
        networking: [
            "LAN Configuration",
            "Network Troubleshooting",
            "Basic Cisco Knowledge",
            "DHCP Configuration"
        ],
        deployment: [
            "Vercel",
            "Railway",
            "Hostinger",
            "GitHub Pages",
            "Docker Basics"
        ],
        office: [
            "Microsoft Excel",
            "Microsoft Word",
            "Microsoft PowerPoint",
            "Data Analysis"
        ],
        other: [
            "CI/CD",
            "Basic Linux Commands",
            "VirtualBox",
            "Technical Documentation",
            "Problem Solving"
        ]
    },

    // Keep the original flat skills array for backward compatibility
    skills: [
        "React", "TypeScript", "Next.js", "Node.js", "HTML5", "CSS", "JavaScript",
        "TailwindCSS", "PostgreSQL", "Firebase", "Docker Basics", "CI/CD",
        "LAN Configuration", "Network Troubleshooting", "Microsoft Excel",
        "Basic Linux Commands", "Vercel", "Railway", "Hostinger"
    ],

    languages: ["English (Fluent)", "Indonesian (Native)"]
};

// education.ts
export const educationData = [
    {
        id: 1,
        degree: "Bachelor of Informatics Engineering",
        degreeId: "Sarjana Teknik Informatika",
        institution: "Universitas Budi Luhur",
        location: "Jakarta, Indonesia",
        startDate: "2019",
        endDate: "2023",
        description:
            "Focused on web development and cybersecurity. Learned programming languages and frameworks such as HTML, CSS, JavaScript, PHP, React, and more.",
        descriptionId:
            "Fokus pada pengembangan web dan keamanan siber. Mempelajari bahasa pemrograman dan framework seperti HTML, CSS, JavaScript, PHP, React, dan lainnya.",
        field: "Informatics Engineering",
        fieldId: "Teknik Informatika",
        logo: "/src/assets/logo_edu/budi_luhur.webp"
    },
    {
        id: 2,
        degree: "Vocational Diploma in Computer and Network Engineering",
        degreeId: "Teknik Komputer dan Jaringan",
        institution: "SMK Bina Informatika",
        location: "Tangerang Selatan, Indonesia",
        startDate: "2016",
        endDate: "2019",
        description:
            "Studied computer networks, LAN configuration, troubleshooting, and server basics. Practiced with Cisco, Debian, and VirtualBox.",
        descriptionId:
            "Mempelajari jaringan komputer, konfigurasi LAN, troubleshooting, dan dasar-dasar server. Praktik langsung menggunakan Cisco, Debian, dan VirtualBox.",
        field: "Computer and Network Engineering",
        fieldId: "Teknik Komputer dan Jaringan",
        logo: "/src/assets/logo_edu/bina_informatika.webp"
    }
];


export const experience = [
    {
        id: 1,
        title: "Freelance Fullstack Web Developer",
        titleId: "Pengembang Web Fullstack lepas",
        company: "Jaya Mandiri",
        location: "Tangerang Selatan, ID",
        startDate: "2025",
        endDate: "2025 (1 Month)",
        endDateId: "2025 (1 Bulan)",
        description: "Create a company profile website for Jaya Mandiri with the 'Contact Us' feature to facilitate interaction with users and convey information about Jaya Mandiri effectively, in order to improve personal branding and company credibility.",
        descriptionId: "Membuat website company profile untuk Jaya Mandiri dengan fitur 'Hubungi Kami' guna memudahkan interaksi dengan pengguna serta menyampaikan informasi tentang Jaya Mandiri secara efektif, dalam rangka meningkatkan personal branding dan kredibilitas perusahaan.",
        achievements: [
            "Developed a responsive company profile website using React, Vite, and Tailwind CSS",
            "Implemented a functional 'Contact Us' section using form handling without backend integration",
            "Optimized site performance with Vite for fast loading and smooth user experience"
        ],
        achievementsId: [
            "Membuat website profil perusahaan yang responsif menggunakan React, Vite, dan Tailwind CSS",
            "Mengimplementasikan fitur 'Hubungi Kami' menggunakan penanganan form tanpa integrasi backend",
            "Mengoptimalkan performa situs dengan Vite untuk waktu muat cepat dan pengalaman pengguna yang lancar"
        ]
    },
    {
        id: 2,
        title: "Freelance Fullstack Web Developer",
        titleId: "Pengembang Web Fullstack lepas",
        company: "Nion Coffee",
        location: "Indonesia",
        startDate: "2024",
        endDate: "2024 (1 Month)",
        endDateId: "2024 (1 Bulan)",
        description: "Developed a web-based sales analysis system using data mining to support business decisions.",
        descriptionId: "Mengembangkan sistem analisis penjualan berbasis web menggunakan data mining untuk mendukung pengambilan keputusan bisnis.",
        achievements: [
            "Implemented C4.5 algorithm to classify and analyze sales data for market targeting",
            "Built backend logic in PHP to process and serve mining results",
            "Developed responsive frontend using Laravel Blade, CSS, and Bootstrap"
        ],
        achievementsId: [
            "Mengimplementasikan algoritma C4.5 untuk mengklasifikasi dan menganalisis data penjualan dalam penentuan target pasar",
            "Membangun logika backend menggunakan PHP untuk memproses dan menyajikan hasil data mining",
            "Mengembangkan frontend responsif menggunakan Laravel Blade, CSS, dan Bootstrap"
        ]
    },
    {
        id: 3,
        title: "Freelance Fullstack Web Developer",
        titleId: "Pengembang Web Fullstack lepas",
        company: "Nion Coffee",
        location: "Indonesia",
        startDate: "2024",
        endDate: "2024 (3 Month)",
        endDateId: "2024 (3 Bulan)",
        description: "Developed a company profile website with an integrated admin dashboard to manage dynamic site content.",
        descriptionId: "Mengembangkan website company profile dengan dashboard admin terintegrasi untuk mengelola konten situs secara dinamis.",
        achievements: [
            "Built a dynamic admin dashboard to control homepage elements such as menu items and pricing",
            "Enabled real-time updates from the admin panel to reflect changes on the public site",
            "Designed a clean, responsive layout using Laravel Blade, CSS, and Bootstrap"
        ],
        achievementsId: [
            "Membangun dashboard admin dinamis untuk mengatur elemen halaman utama seperti daftar menu dan harga",
            "Mengaktifkan pembaruan real-time dari panel admin yang langsung terlihat di situs utama",
            "Merancang tampilan yang bersih dan responsif menggunakan Laravel Blade, CSS, dan Bootstrap"
        ]
    },
    {
        id: 4,
        title: "IT Support Technician Intern",
        titleId: "Magang IT Support Technician",
        company: "Kementerian Pertanian Republik Indonesia",
        location: "Jakarta, ID",
        startDate: "2018",
        endDate: "2018 (6 Months)",
        endDateId: "2018 (6 Bulan)",
        description: "Interned as IT Support Technician focusing on basic network troubleshooting, LAN configuration, and assisting daily technical support tasks.",
        descriptionId: "Magang sebagai IT Support Technician dengan fokus pada troubleshoot jaringan dasar, konfigurasi LAN, dan membantu tugas-tugas dukungan teknis harian.",
        achievements: [
            "Performed basic network troubleshooting and resolved connectivity issues within the office",
            "Assisted in configuring and maintaining LAN networks and cable management",
            "Supported staff with hardware/software setup and minor tech issues"
        ],
        achievementsId: [
            "Melakukan troubleshoot jaringan dasar dan menyelesaikan masalah konektivitas di lingkungan kantor",
            "Membantu konfigurasi dan pemeliharaan jaringan LAN serta penataan kabel",
            "Memberikan dukungan kepada staf dalam pengaturan perangkat keras/perangkat lunak dan permasalahan teknis ringan"
        ]
    }
];

// projects.ts
export const projects = [
    {
        title: "Deflix - Movie Trailer App",
        titleId: "Deflix - Aplikasi Trailer Film",
        description: "A Netflix-like UI for browsing and watching trailers using TMDB API, built for learning with Next.js, NestJS, PostgreSQL, and Docker.",
        descriptionId: "Tampilan mirip Netflix untuk menjelajah dan menonton trailer menggunakan API TMDB, dibuat untuk keperluan belajar dengan Next.js, NestJS, PostgreSQL, dan Docker.",
        image: "/src/assets/projects/deflix.webp",
        technologies: ["Next.js", "NestJS", "PostgreSQL", "TMDB API", "Redux", "Docker"],
        demoLink: "https://deflix-three.vercel.app/",
        githubLink: "https://github.com/defaaryawar/deflix-frontend"
    },
    {
        title: "Def-AnimeList - Anime Explorer App",
        titleId: "AnimeList - Aplikasi Penjelajah Anime",
        description: "Simple anime listing app using public anime APIs with a modern interface built using Next.js, Tailwind CSS, DaisyUI, and TypeScript.",
        descriptionId: "Aplikasi daftar anime sederhana dengan antarmuka modern, dibangun menggunakan Next.js, Tailwind CSS, DaisyUI, dan TypeScript dengan integrasi API publik anime.",
        image: "/src/assets/projects/animelist.webp",
        technologies: ["Next.js", "React", "Tailwind CSS", "DaisyUI", "TypeScript", "Anime API"],
        demoLink: "https://def-anime.vercel.app/",
        githubLink: "https://github.com/defaaryawar/def-anime"
    },
    {
        title: "Jaya Mandiri - Admin Dashboard",
        titleId: "Jaya Mandiri - Dashboard Admin",
        description: "A modern and responsive admin dashboard for managing deliveries at Jaya Mandiri, built with React (Vite) frontend and NestJS backend, featuring PostgreSQL and unit testing with Jest.",
        descriptionId: "Dashboard admin yang modern dan responsif untuk mengelola pengiriman di Jaya Mandiri, dibangun dengan frontend React (Vite) dan backend NestJS, menggunakan PostgreSQL dan pengujian unit dengan Jest.",
        image: "/src/assets/projects/admin-jm.webp",
        technologies: ["React", "Vite", "NestJS", "PostgreSQL", "Jest", "Hooks"],
        githubLink: "https://github.com/defaaryawar/dashboard-jaya-mandiri"
    },
    {
        title: "Jaya Mandiri - Company Profile",
        titleId: "Jaya Mandiri - Profil Perusahaan",
        description: "A clean and responsive company profile website for Jaya Mandiri, built using React, TailwindCSS, and Shadcn UI with smooth layout and modular components.",
        descriptionId: "Website profil perusahaan yang bersih dan responsif untuk Jaya Mandiri, dibangun dengan React, TailwindCSS, dan Shadcn UI menggunakan komponen modular dan tampilan modern.",
        image: "/src/assets/projects/jayamandiri.webp",
        technologies: ["React", "Tailwind CSS", "Shadcn UI"],
        demoLink: "https://jaya-mandiri.vercel.app/",
        githubLink: "https://github.com/defaaryawar/jaya-mandiri"
    },
    {
        title: "Nion Coffee - Company Profile",
        titleId: "Nion Coffee - Profil Perusahaan",
        description: "A fully-featured and scalable company profile app for Nion Coffee, leveraging React with Vite, TailwindCSS, DaisyUI, REST API, and solid architecture using OOP and Redux. One of the most complete and polished projects.",
        descriptionId: "Aplikasi profil perusahaan yang kaya fitur dan scalable untuk Nion Coffee, menggunakan React dengan Vite, TailwindCSS, DaisyUI, REST API, serta arsitektur solid dengan pendekatan OOP dan manajemen state menggunakan Redux. Salah satu proyek paling lengkap dan matang.",
        image: "/src/assets/projects/nion.webp",
        technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "REST API", "OOP", "Redux"],
        demoLink: "https://nioncoffee.store/",
        githubLink: "https://github.com/defaaryawar/nion-coffee"
    },
    {
        title: "TodoList App - Productivity Tool",
        titleId: "TodoList App - Alat Produktivitas",
        description: "A simple yet powerful TodoList application with full CRUD capabilities, built using React and TailwindCSS on the frontend, and Python backend with PostgreSQL. Includes clean and comprehensive documentation for easy understanding and scalability.",
        descriptionId: "Aplikasi TodoList yang sederhana namun powerful dengan kemampuan CRUD penuh, dibangun menggunakan React dan TailwindCSS di frontend, serta backend Python dengan PostgreSQL. Didukung dokumentasi lengkap dan rapi untuk kemudahan pengembangan dan skalabilitas.",
        image: "/src/assets/projects/todo.webp",
        technologies: ["React", "Tailwind CSS", "Python (Flask/FastAPI)", "PostgreSQL", "CRUD", "Documentation"],
        githubLink: "https://github.com/defaaryawar/Todo-app-list"
    }
];

// certificates.ts
export const certificatesData = [
    {
        id: 1,
        title: "Basic Computer Algorithm Competency",
        titleId: "Kompetensi Dasar Algoritma Komputer",
        issuer: "Budi Luhur University",
        issuerId: "Universitas Budi Luhur",
        date: "2023",
        credentialId: "F/UBL/FTI/000/014/02/23",
        credentialUrl: "https://drive.google.com/file/d/1AGbqaV402W26gNaqq3AHrNym8geL7lM_/view?usp=sharing",
        description: "Foundational course in computer algorithms, covering basic concepts such as sorting, searching, and algorithmic problem-solving.",
        descriptionId: "Kursus dasar tentang algoritma komputer, mencakup konsep dasar seperti pengurutan, pencarian, dan pemecahan masalah algoritmik.",
        skills: ["Algorithm", "Problem Solving", "Computational Thinking"],
        logo: "data:image/jpeg;base64,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"
    },
    {
        id: 2,
        title: "Frontend HTML",
        titleId: "Pengembang HTML",
        issuer: "MySkill",
        issuerId: "MySkill",
        date: "2024",
        credentialId: "MS-23/10/2024-6fY7E8xx862sFysogzqc",
        credentialUrl: "https://storage.googleapis.com/myskill-v2-certificates/topic-DQ4WDIr2jXa70FUI477S/STS9OTKP3HU9mTnzkBi4qzBrY4l2-6fY7E8xx862sFysogzqc.pdf",
        description: "Certification covering the fundamentals of HTML, including semantic structure, forms, multimedia, and accessibility in frontend development.",
        descriptionId: "Sertifikasi yang mencakup dasar-dasar HTML, termasuk struktur semantik, formulir, multimedia, dan aksesibilitas dalam pengembangan frontend.",
        skills: ["HTML5", "Semantic HTML", "Web Accessibility", "Frontend Development"],
        logo: "https://yt3.googleusercontent.com/wFVwjKnPGXQbgBFrD_L7DrJN5YDaGBn20GLRYR9OlD1JGwXo9YSez8RHg3Yj2B8U9KzoVPQo=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 3,
        title: "Data Analyst",
        titleId: "Analis Data",
        issuer: "MySkill",
        issuerId: "MySkill",
        date: "2024",
        credentialId: "MS-4/11/2024-M5L4Qm9KNEfBPGGOKRy6",
        credentialUrl: "https://storage.googleapis.com/myskill-v2-certificates/topic-qtKMZ78xyd6TPzUQOESu/STS9OTKP3HU9mTnzkBi4qzBrY4l2-M5L4Qm9KNEfBPGGOKRy6.pdf",
        description: "Certificate program focused on fund analysis, financial planning, and fund allocation strategies.",
        descriptionId: "Program sertifikasi yang berfokus pada analisis dana, perencanaan keuangan, dan strategi alokasi dana.",
        skills: ["Fund Analysis", "Financial Planning", "Budget Allocation"],
        logo: "https://yt3.googleusercontent.com/wFVwjKnPGXQbgBFrD_L7DrJN5YDaGBn20GLRYR9OlD1JGwXo9YSez8RHg3Yj2B8U9KzoVPQo=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 4,
        title: "Mahir Microsoft Excel",
        titleId: "Mahir Microsoft Excel",
        issuer: "Fasz Edu",
        issuerId: "Fasz Edu",
        date: "2024",
        credentialId: "19/Excel/Bootcamp-110/faszedu/X/2024",
        credentialUrl: "https://drive.google.com/file/d/1A6fsw2VVEHsGcK6uzBm7uN2MxLDsO3f1/view?usp=sharing",
        description: "Comprehensive training in Microsoft Excel covering formulas, pivot tables, charts, and data analysis features.",
        descriptionId: "Pelatihan komprehensif Microsoft Excel mencakup rumus, pivot table, grafik, dan fitur analisis data.",
        skills: ["Microsoft Excel", "Data Analysis", "Pivot Table", "Excel Charts"],
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAz5tceaZoaUW41ltAT5TfF6kzaWEdUkVHNw&s"
    },
    {
        id: 5,
        title: "Generative AI For Information Systems",
        titleId: "Kecerdasan Buatan Generatif untuk Sistem Informasi",
        issuer: "Budi Luhur University",
        issuerId: "Universitas Budi Luhur",
        date: "2024",
        credentialId: "F/UBL/FTI/000/023/06/24",
        credentialUrl: "https://drive.google.com/file/d/12-BBQ9UGD5eTnTl05FrM4FZZIBDReTQ2/view?usp=sharing",
        description: "Introductory course on applying Generative AI in the context of information systems, covering foundational AI concepts, prompt engineering, and responsible AI practices.",
        descriptionId: "Kursus pengantar tentang penerapan AI generatif dalam konteks sistem informasi, mencakup konsep dasar AI, teknik prompt, dan praktik AI yang bertanggung jawab.",
        skills: ["Generative AI", "Prompt Engineering", "Information Systems", "Responsible AI"],
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuuDbmy2EyDG9oFH9UCgU5EsGcwIjcpmyGgg&s"
    },
    {
        id: 6,
        title: "Intro to Data Analysis",
        titleId: "Pengantar Analisis Data",
        issuer: "RevoU",
        issuerId: "RevoU",
        date: "2024",
        credentialId: "DAMC-141024-01-1-00311",
        credentialUrl: "https://drive.google.com/file/d/1uJlbGDK0ZdZMREgPpYxFVuffmuynku5m/view",
        description: "Beginner-level course introducing the principles of data analysis using spreadsheets and SQL.",
        descriptionId: "Kursus tingkat pemula yang memperkenalkan prinsip analisis data menggunakan spreadsheet dan SQL.",
        skills: ["Data Analysis", "Spreadsheets", "SQL", "Data Interpretation"],
        logo: "https://storage.googleapis.com/danacita-website-v3-prd/website_v3/images/Revou-alasan.original.png"
    },
    {
        id: 7,
        title: "Data Analyst Fundamental",
        titleId: "Dasar-dasar Analis Data",
        issuer: "MySkill",
        issuerId: "MySkill",
        date: "2024",
        credentialId: "MS-22/10/2024-PiVeq7Ss6Vtz4hnNkqtE",
        credentialUrl: "https://storage.googleapis.com/myskill-v2-certificates/course-RCSiMvBEzWATT8Dp120a/STS9OTKP3HU9mTnzkBi4qzBrY4l2-PiVeq7Ss6Vtz4hnNkqtE.pdf",
        description: "Fundamental program for aspiring data analysts covering data types, analysis techniques, and visualization.",
        descriptionId: "Program dasar untuk calon analis data mencakup tipe data, teknik analisis, dan visualisasi.",
        skills: ["Data Fundamentals", "Data Visualization", "Analytical Thinking"],
        logo: "https://yt3.googleusercontent.com/wFVwjKnPGXQbgBFrD_L7DrJN5YDaGBn20GLRYR9OlD1JGwXo9YSez8RHg3Yj2B8U9KzoVPQo=s900-c-k-c0x00ffffff-no-rj"
    },
];

// testimonials.ts
export const testimonials = [
    {
        name: "Sarah Johnson",
        position: "Product Manager, Tech Innovations",
        content: "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and commitment to user experience sets him apart.",
        avatar: "/images/testimonials/sarah.jpg"
    },
    {
        name: "Michael Chen",
        position: "CTO, Digital Solutions",
        content: "Working with John was a pleasure. He not only writes clean, maintainable code, but also contributes valuable insights to product strategy.",
        avatar: "/images/testimonials/michael.jpg"
    },
    {
        name: "Emily Rodriguez",
        position: "UX Designer",
        content: "John has a rare ability to translate designs into pixel-perfect implementations. He's collaborative and always finds elegant solutions to complex problems.",
        avatar: "/images/testimonials/emily.jpg"
    }
];


