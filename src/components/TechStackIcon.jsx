import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language, category }) => {
  // Function to get gradient colors based on category
  const getCategoryGradient = (cat) => {
    const gradients = {
      "Programming Languages": "from-blue-500 to-blue-700",
      "Frontend Development": "from-pink-500 to-purple-600",
      "Backend Development": "from-green-500 to-emerald-600",
      "Database & Cloud": "from-blue-400 to-cyan-500",
      "AI & Machine Learning": "from-yellow-500 to-orange-600",
      "DevOps & Tools": "from-gray-500 to-slate-700",
      // Default fallback
      "default": "from-blue-500 to-purple-500"
    };
    
    return gradients[cat] || gradients.default;
  };

  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className={`absolute -inset-1 bg-gradient-to-r ${getCategoryGradient(category)} rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300`}></div>
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;