export interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
    logo?: string;
}

export interface Certificate {
    id: number;
    name: string;
    issuer: string;
    date: string;
    url?: string;
    logo?: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    featured: boolean;
}

export interface TechSkill {
    id: number;
    name: string;
    icon?: string;
    proficiency: number;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
}

export interface SoftSkill {
    id: number;
    name: string;
    description: string;
    icon?: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    bio: string;
    avatar?: string;
}

export interface NavigationLink {
    id: string;
    label: string;
    path: string;
    icon: string;
}