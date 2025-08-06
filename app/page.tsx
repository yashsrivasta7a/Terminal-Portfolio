"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Circle,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Download,
  Linkedin,
  Filter,
  Star,
  Calendar,
  Code,
  Globe,
  LinkedinIcon,
  Instagram
} from "lucide-react";
import type { JSX } from "react/jsx-runtime";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  type: 'webapp' | 'extension';
  year?: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  experience: Array<{
    role: string;
    company: string;
    period: string;
    summary: string;
  }>;
  education: string[];
  github: string;
  linkedin: string;
  leetcode:string;
}

interface HistoryEntry {
  command: string;
  output: JSX.Element | string;
  isInitial?: boolean;
}

export default function GlassTerminalPortfolio() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [initialHistory, setInitialHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("~");
  const [lastLogin, setLastLogin] = useState<Date>(new Date());
  const [projectFilter, setProjectFilter] = useState<'all' | 'featured' | 'webapps' | 'extensions'>('all');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalInfo: PersonalInfo = {
    name: "Yash Srivasta7a",
    title: "Full Stack Developer",
    email: "yashsrivasta7a@gmail.com",
    location: "Gurugram, India",
    bio: "async function life() { while(true) { await coffee(); code(); debug(); cry(); } }",
    skills: [
      "React",
      "Tailwind CSS",
      "Langchain",
      "JavaScript",
      "Firebase",
      "Node.js",
      "Express",
      "Figma",
      "C++",
      "Git",
      "GitHub",
      "CSS",
      "Google Analytics",
      "Photoshop",
      "Adobe XD",
    ],
    experience: [
      {
        role: "Academic Trainee",
        company: "KPMG India",
        period: "Jun 2025 – Aug 2025",
        summary:
          "Developed PoCs for internal CRM automation and workflow optimization in the enterprise sector.",
      },
      {
        role: "React Developer",
        company: "FISU, MRIIRS",
        period: "Jun 2024 – Sep 2024",
        summary:
          "Built and deployed interactive web components for a sports championship dashboard with real-time event syncing.",
      },
    ],
    education: [
      "B.Tech in Computer Science Engineering (2022–2026)",
    ],
    github: "https://github.com/yashsrivasta7a",
    linkedin: "https://linkedin.com/in/yashsrivasta7a",
    leetcode: "https://leetcode.com/u/yashsrivasta7a/",
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "AuroraPlay",
      description:
        "Smart music recommender based on weather using Spotify & Gemini APIs.",
      technologies: ["React", "Spotify API", "Gemini API"],
      github: "https://github.com/yashsrivasta7a/AuroraPlay",
      live: "https://auroraplayai.vercel.app/",
      featured: true,
      type: 'webapp',
      year: "2024"
    },
    {
      id: "2",
      title: "DreamPix",
      description:
        "Generate AI images from text using Fal AI with Auth0 login and Firebase storage.",
      technologies: ["React", "Firebase", "Auth0", "Fal AI"],
      github: "https://github.com/yashsrivasta7a/DreamPix",
      live: "https://dreampix.vercel.app/",
      featured: true,
      type: 'webapp',
      year: "2024"
    },
    {
      id: "3",
      title: "Law Link",
      description:
        "Generate legal docs using OpenAI and export them to PDF with a clean UI.",
      technologies: ["React", "OpenAI API", "js-PDF"],
      github: "https://github.com/ManasJhaMJ/LawLink-web",
      live: "https://law-link-web.vercel.app/",
      featured: true,
      type: 'webapp',
      year: "2024"
    },
    {
      id: "4",
      title: "AutoStar EMS Extension",
      description: "Chrome extension for automatic feedback forms fill.",
      technologies: ["JavaScript", "Chrome APIs"],
      github: "https://github.com/yashsrivasta7a",
      live: "https://autostar-ems.vercel.app/",
      type: 'extension',
      year: "2024"
    },
    {
      id: "5",
      title: "Lyrically Extension",
      description: "Real-time music lyrics viewer extension for youtube.",
      technologies: ["JavaScript", "Chrome APIs"],
      github: "https://github.com/yashsrivasta7a/Lyrically",
      type: 'extension',
      year: "2024"
    },
    {
      id: "6",
      title: "PingSet",
      description:
        "Your whatsapp buddy that sends the superset newly updated companies message to your whatsapp.",
      technologies: ["JavaScript", "Chrome APIs"],
      github: "https://github.com/yashsrivasta7a/PingSet",
      type: 'extension',
      year: "2024"
    },
    {
      id: "7",
      title: "Flow4Life",
      description: "Streamlines emergency blood donations by directly connecting and messaging nearby donors with recipients.",
      technologies: ["React", "Firebase"],
      live: "https://flow4life.vercel.app/",
      type: 'webapp',
      year: "2024"
    },
    {
      id: "8",
      title: "Waste To Energy",
      description:
        "Hackathon project to convert organic waste into energy insights.",
      technologies: ["Next.js"],
      live: "https://organic-waste-to-energy.vercel.app/",
      type: 'webapp',
      year: "2024"
    },
    {
      id: "9",
      title: "PokeDex",
      description:
        "A dynamic Pokémon encyclopedia with real-time data fetching.",
      technologies: ["React", "API Integration"],
      live: "https://pokedex-ys7.vercel.app/",
      type: 'webapp',
      year: "2024"
    },
  ];

  const formatLastLogin = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleString();
  };

  const handleResumeDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1Pfnr1L0tNAkztcF-HGJy8cXLsphhsuU2/view?usp=sharing",
      "_blank"
    );
  };

  const getFilteredProjects = () => {
    switch (projectFilter) {
      case 'featured':
        return projects.filter(p => p.featured);
      case 'webapps':
        return projects.filter(p => p.type === 'webapp');
      case 'extensions':
        return projects.filter(p => p.type === 'extension');
      default:
        return projects;
    }
  };

  const handleProjectFilter = (filter: 'all' | 'featured' | 'webapps' | 'extensions') => {
    setProjectFilter(filter);

    const currentEntry = history[history.length - 1];
    if (currentEntry.command === 'projects') {
      const newHistory = [...history];
      newHistory[newHistory.length - 1] = {
        command: 'projects',
        output: commands.projects()
      };
      setHistory(newHistory);
    }
  };

  const commands = {
    help: () => (
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">Available commands:</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "projects",
            "skills",
            "experience",
            "education",
            "contact",
            "socials",
            "neofetch",
            "date",
            "cls",
            
          ].map((cmd) => (
            <div
              key={cmd}
              className="glass-card p-3 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-green-400 font-mono text-sm font-medium">
                {cmd}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-500 text-xs mt-3">
          Hint: `project [id]` and project filter commands are also available.
        </div>
      </div>
    ),


    socials: () => (
      <div className="space-y-3">
        <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <Github className="w-4 h-4 text-gray-400" />
            <a
              href={personalInfo.github}
              className="text-gray-300 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/yashsrivasta7a
            </a>
          </div>
        </div>
        <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <LinkedinIcon className="w-4 h-4 text-gray-400" />
            <a
              href={personalInfo.linkedin}
              className="text-gray-300 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/yashsrivasta7a
            </a>
          </div>
        </div>
         <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <Code className="w-4 h-4 text-gray-400" />
            <a
              href={personalInfo.leetcode}
              className="text-gray-300 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              leetcode.com/yashsrivasta7a
            </a>
          </div>
        </div>
         <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Instagram className="w-4 h-4 text-gray-400" />
              <a
                href="https://www.instagram.com/yashsrivasta7a/"
                className="text-gray-300 hover:text-green-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram.com/yashsrivasta7a
              </a>
            </div>
          </div>
      </div>
    ),

    neofetch: () => {
      const asciiArt = `
Y S 7       7 S Y
 Y S 7     7 S Y
  Y S 7   7 S Y
   Y S 7 7 S Y
      Y S 7
      Y S 7
      Y S 7
      Y S 7
      `;
      return (
        <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-8">
          <pre className="text-sm text-fuchsia-400 whitespace-pre-wrap select-none">
            {asciiArt}
          </pre>
          <div className="space-y-2 text-sm">
            <div className="text-lg text-cyan-400">
              {personalInfo.name}
            </div>
            <div className="border-b border-gray-700 w-full"></div>
            <div>
              <span className="text-cyan-400 font-bold">Title:</span> {personalInfo.title}
            </div>
            <div>
              <span className="text-cyan-400 font-bold">OS:</span> Web Browser
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Host:</span> Vercel
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Shell:</span> web-sh
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Skills:</span> {personalInfo.skills.slice(0, 5).join(", ")}...
            </div>
          </div>
        </div>
      );
    },

    date: () => (
      <div className="text-gray-300">
        {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </div>
    ),

    projects: () => {
   
      setProjectFilter('all');
      
      return (
        <div className="space-y-4">
          <div className="text-gray-400 mb-4 flex items-center gap-2">
            <span>Projects ({projects.length})</span>
          </div>
          
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono bg-black/30 px-2 py-1 rounded text-xs font-bold border border-green-400/30">
                    {project.id}
                  </span>
                  <div className="text-white font-medium">{project.title}</div>
                  {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.type === 'webapp' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {project.type === 'webapp' ? 'Web App' : 'Extension'}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4 text-green-400 hover:text-green-300" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-gray-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-gray-600 text-xs mt-4 pt-3 border-t border-white/10">
            Tip: Use commands like 'extensions' or 'webapps'
          </div>
        </div>
      );
    },

    filter: (type: string) => {
      const validFilters = ['all', 'featured', 'webapps', 'extensions'];
      if (validFilters.includes(type)) {
        handleProjectFilter(type as any);
        return commands.projects();
      }
      return (
        <div className="glass-card p-4 rounded-lg border border-red-500/20 backdrop-blur-sm bg-red-500/5">
          <div className="text-red-400">
            Invalid filter. Use: {validFilters.join(', ')}
          </div>
        </div>
      );
    },

    webapps: () => {
      const webappProjects = projects.filter(p => p.type === 'webapp');
      setProjectFilter('webapps');
      
      return (
        <div className="space-y-4">
          <div className="text-gray-400 mb-4 flex items-center gap-2">
            <span>Projects ({webappProjects.length})</span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              webapps
            </span>
          </div>
          
          {webappProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono bg-black/30 px-2 py-1 rounded text-xs font-bold border border-green-400/30">
                    {project.id}
                  </span>
                  <div className="text-white font-medium">{project.title}</div>
                  {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                    Web App
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4 text-green-400 hover:text-green-300" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-gray-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-gray-600 text-xs mt-4 pt-3 border-t border-white/10">
            Tip: Use commands like 'extensions' or 'webapps'
          </div>
        </div>
      );
    },

    extensions: () => {
   
      const extensionProjects = projects.filter(p => p.type === 'extension');
      setProjectFilter('extensions');
      
      return (
        <div className="space-y-4">
          <div className="text-gray-400 mb-4 flex items-center gap-2">
            <span>Projects ({extensionProjects.length})</span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              extensions
            </span>
          </div>
          
          {extensionProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono bg-black/30 px-2 py-1 rounded text-xs font-bold border border-green-400/30">
                    {project.id}
                  </span>
                  <div className="text-white font-medium">{project.title}</div>
                  {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                    Extension
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4 text-green-400 hover:text-green-300" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-gray-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-gray-600 text-xs mt-4 pt-3 border-t border-white/10">
            Tip: Use commands like 'extensions' or 'webapps'
          </div>
        </div>
      );
    },

    featured: () => {

      const featuredProjects = projects.filter(p => p.featured);
      setProjectFilter('featured');
      
      return (
        <div className="space-y-4">
          <div className="text-gray-400 mb-4 flex items-center gap-2">
            <span>Projects ({featuredProjects.length})</span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              featured
            </span>
          </div>
          
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono bg-black/30 px-2 py-1 rounded text-xs font-bold border border-green-400/30">
                    {project.id}
                  </span>
                  <div className="text-white font-medium">{project.title}</div>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.type === 'webapp' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {project.type === 'webapp' ? 'Web App' : 'Extension'}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4 text-green-400 hover:text-green-300" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-gray-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-gray-600 text-xs mt-4 pt-3 border-t border-white/10">
            Tip: Use commands like 'extensions' or 'webapps'
          </div>
        </div>
      );
    },

    project: (id: string) => {
      const project = projects.find((p) => p.id === id);
      if (!project) {
        return (
          <div className="glass-card p-4 rounded-lg border border-red-500/20 backdrop-blur-sm bg-red-500/5">
            <div className="text-red-400">
              Project not found. Available IDs:{" "}
              {projects.map((p) => p.id).join(", ")}
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-mono bg-black/30 px-3 py-1 rounded font-bold border border-green-400/30">
                  {project.id}
                </span>
                <span className="text-xl text-white font-medium">
                  {project.title}
                </span>
                {project.featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
              </div>
            </div>
            <div className="text-gray-300 mb-4">{project.description}</div>

            <div className="space-y-3">
              <div className="text-gray-400 text-sm">Technologies:</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm text-gray-300 bg-black/30 backdrop-blur-sm px-3 py-1 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            {project.github && (
              <a
                href={project.github}
                className="glass-card flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">View Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className="glass-card flex items-center space-x-2 px-4 py-2 rounded-lg border border-green-500/20 backdrop-blur-sm bg-green-500/5 hover:bg-green-500/10 text-gray-300 hover:text-green-400 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      );
    },

    skills: () => (
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">Technical Skills:</div>
        <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {personalInfo.skills.map((skill) => (
              <div
                key={skill}
                className="text-gray-300 text-sm bg-black/20 backdrop-blur-sm px-3 py-2 rounded border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                • {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    experience: () => (
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">Work Experience:</div>
        <div className="space-y-4">
          {personalInfo.experience.map((exp, index) => (
            <div
              key={index}
              className="glass-card p-5 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="border-l-2 border-green-400/30 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-semibold text-lg">
                    {exp.role}
                  </div>
                  <div className="text-gray-400 text-sm">{exp.period}</div>
                </div>
                <div className="text-cyan-400 text-sm mb-3">{exp.company}</div>
                <div className="text-gray-300 text-sm leading-relaxed">
                  {exp.summary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    education: () => (
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">Education:</div>
        <div className="space-y-3">
          {personalInfo.education.map((edu, index) => (
            <div
              key={index}
              className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-gray-300 text-sm border-l-2 border-blue-400/30 pl-3">
              <div>
                  <div>
Manav Rachna International Institute of Research and Studies :
                </div>
                <div>
                {edu}
                  </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    contact: () => (
      <div className="space-y-4">
        <div className="text-gray-400 mb-4">Contact:</div>
        <div className="space-y-3">
          <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 break-all">{personalInfo.email}</span>
            </div>
          </div>
          <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
            <LinkedinIcon className="w-4 h-4 text-gray-400" />
            <a
              href={personalInfo.linkedin}
              className="text-gray-300 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.in/yashsrivasta7a
            </a>
          </div>
          </div>
        </div>
      </div>
    ),

    cls: () => {
      setHistory([...initialHistory]);
      return "";
    },

    clear: () => {
        setHistory([...initialHistory]);
        return "";
    },

    ls: () => (
      <div className="glass-card p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-blue-400 bg-black/20 px-2 py-1 rounded">
            projects/
          </div>
          <div className="text-blue-400 bg-black/20 px-2 py-1 rounded">
            skills/
          </div>
          <div className="text-blue-400 bg-black/20 px-2 py-1 rounded">
            experience/
          </div>
          <div className="text-gray-300 bg-black/20 px-2 py-1 rounded">
            README.md
          </div>
        </div>
      </div>
    ),

    pwd: () => (
      <div className="glass-card p-3 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
        <div className="text-gray-300 font-mono">
          /users/{personalInfo.name.toLowerCase().replace(" ", "")}
          {currentPath}
        </div>
      </div>
    ),

    whoami: () => (
      <div className="glass-card p-3 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
        <div className="text-gray-300 font-mono">
          {personalInfo.name.toLowerCase().replace(" ", "")}
        </div>
      </div>
    ),
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(" ");

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd.trim()]);
      setHistoryIndex(-1);
    }

    if (command === "cls" || command === 'clear') {
      setHistory([...initialHistory]);
      return;
    }

    let output: JSX.Element | string = "";

    if (command in commands) {
      if (command === "project" && args.length > 0) {
        output = commands.project(args[0]);
      } else if (command === "project" && args.length === 0) {
        output = (
          <div className="glass-card p-4 rounded-lg border border-red-500/20 backdrop-blur-sm bg-red-500/5">
            <div className="text-red-400">
              Usage: project [ID] - Available IDs:{" "}
              {projects.map((p) => p.id).join(", ")}
            </div>
          </div>
        );
      } else if (command === "filter" && args.length > 0) {
        output = commands.filter(args[0]);
      } else {
        output = (commands as any)[command]();
      }
    } else if (command === "") {
      output = "";
    } else {
      output = (
        <div className="glass-card p-4 rounded-lg border border-red-500/20 backdrop-blur-sm bg-red-500/5">
          <div className="text-red-400">
            Command not found: {command}. Type 'help' for available commands.
          </div>
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {

    setLastLogin(new Date(Date.now() - Math.random() * 3600000)); 

    const welcomeMessage: HistoryEntry = {
      command: "",
      output: (
        <div className="space-y-4">
          <div className="glass-card p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl text-white font-light mb-1">
                  {personalInfo.name}
                </div>
                <div className="text-gray-400 mb-2">{personalInfo.title}</div>
                <div className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                  {personalInfo.bio}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm border-t border-white/10 pt-4 mb-4">
              <div className="glass-card px-3 py-2 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 flex items-center space-x-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
              <div className="glass-card px-3 py-2 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 flex items-center space-x-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300 break-all">
                  {personalInfo.email}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
              <div className="text-gray-500 text-sm">
                Type{" "}
                <span className="text-green-400 font-mono bg-black/20 px-2 py-1 rounded">
                  help
                </span>{" "}
                to explore my work
              </div>
              <button
                onClick={handleResumeDownload}
                className="glass-card flex items-center shrink-0 justify-center space-x-2 px-4 py-2 rounded-lg border border-blue-500/20 backdrop-blur-sm bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download Resume</span>
              </button>
            </div>
          </div>
          <div className="glass-card p-3 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
            <div className="text-gray-600 text-xs">
              Last login: {formatLastLogin(lastLogin)}
            </div>
          </div>
        </div>
      ),
      isInitial: true,
    };

    const initialHistoryArray = [welcomeMessage];
    setInitialHistory(initialHistoryArray);
    setHistory(initialHistoryArray);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      
      setHistory((prev) => [...prev]);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-2 sm:p-4 flex items-center justify-center">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-green-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl sm:max-w-3xl mx-auto relative z-10">
     
         <div className="glass-terminal rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-black/40">
         
          <div className="glass-header px-4 py-3 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-white/5">
            <div className="flex items-center space-x-2">
              <Circle className="w-3 h-3 fill-red-500 text-red-500 hover:fill-red-400 transition-colors cursor-pointer" />
              <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500 hover:fill-yellow-400 transition-colors cursor-pointer" />
              <Circle className="w-3 h-3 fill-green-500 text-green-500 hover:fill-green-400 transition-colors cursor-pointer" />
            </div>
            <div className="text-gray-400 text-sm font-mono bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
              {personalInfo.name.toLowerCase().replace(" ", "")}@portfolio:{currentPath}
            </div>
            <div className="w-16"></div>
          </div>


          <div
            ref={terminalRef}
            className="bg-black/20 backdrop-blur-sm text-green-400 font-mono text-xs sm:text-sm p-3 sm:p-6 min-h-[300px] sm:min-h-[500px] max-h-[60vh] sm:max-h-[70vh] overflow-y-auto glass-scrollbar rounded-b-2xl"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-3 sm:mb-4 break-words">
                {entry.command && (
                  <div className="flex flex-col sm:flex-row sm:items-center mb-1 sm:mb-2">
                    <span className="text-gray-500 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm text-xs sm:text-sm shrink-0">
                      {personalInfo.name.toLowerCase().replace(" ", "")}
                      @portfolio:{currentPath}$
                    </span>
                    <span className="text-green-400 sm:ml-2 break-all">
                      {entry.command}
                    </span>
                  </div>
                )}
                {entry.output && (
                  <div className="text-gray-100 text-xs sm:text-sm whitespace-pre-wrap">
                    {entry.output}
                  </div>
                )}
              </div>
            ))}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <span className="text-gray-500 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm text-xs sm:text-sm shrink-0">
                {personalInfo.name.toLowerCase().replace(" ", "")}@portfolio:
                {currentPath}$
              </span>
              <div className="flex items-center w-full sm:flex-1 sm:ml-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent text-green-400 outline-none flex-1 font-mono text-xs sm:text-sm placeholder-green-600"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="text-green-400 animate-pulse text-xs sm:text-sm select-none">
                  _
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center px-2 sm:px-0">
          <div className="flex flex-wrap justify-center gap-2">
            {["projects", "skills", "experience", "contact"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  handleCommand(cmd);
                  setInput("");
                }}
                className="glass-card px-4 py-2 rounded-lg text-gray-400 hover:text-green-400 text-sm sm:text-base font-mono transition-all duration-300 border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 min-w-[80px]"
                type="button"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .glass-terminal {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .glass-header {
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }
        .glass-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .glass-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 3px;
        }
        .glass-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 3px;
        }
        .glass-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}