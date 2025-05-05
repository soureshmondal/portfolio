import {
  Linkedin,
  Github,
  ExternalLink
} from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/souresh-mondal-999a69284",
    icon: Linkedin,
    displayName: "LinkedIn",
    subText: "Follow me",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "GitHub",
    url: "https://github.com/soureshmondal",
    icon: Github,
    displayName: "GitHub",
    subText: "Star my projects",
    gradient: "from-gray-600 to-gray-900"
  }
];

export default function SocialLinksSection() {
  return (
    <div className="w-full max-w-md mx-auto mt-10 space-y-4">
      {socialLinks.map(({ name, url, icon: Icon, displayName, subText, gradient }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block px-4 py-3 rounded-xl border border-white/10 overflow-hidden transition-all transform hover:scale-105"
        >
          
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${gradient}`}
          />

          
          <div
            className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              animation: 'shine 1s infinite'
            }}
          />
          
          <div className="relative z-10 flex items-center gap-4">
            <Icon className="w-6 h-6 text-white group-hover:text-white transition-all duration-300 transform group-hover:scale-110" />
            <div className="flex-1">
              <p className="text-white font-medium group-hover:text-white transition-all duration-300">{displayName}</p>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-all duration-300">{subText}</p>
            </div>
            <ExternalLink
              className="text-white/30 group-hover:text-white transition duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
              size={16}
            />
          </div>
        </a>
      ))}
    </div>
  );
}
