import React from 'react';
import { FileText, Briefcase, Users, Globe } from 'lucide-react';

const HowWeHelp = () => {
  // Data array taaki code clean rahe aur easily map ho sake
  const features = [
    {
      id: 1,
      title: "Visa Support",
      description: "Step-by-step guidance for a smooth process",
      icon: <FileText size={28} strokeWidth={2} />,
      cardBg: "bg-[#f0f5ff]", // Pastel Blue
      iconBg: "bg-[#dbeafe]",
      iconColor: "text-[#2563eb]",
    },
    {
      id: 2,
      title: "Trusted Companies",
      description: "Work with verified employers worldwide",
      icon: <Briefcase size={28} strokeWidth={2} />,
      cardBg: "bg-[#f0fdf4]", // Pastel Green
      iconBg: "bg-[#dcfce7]",
      iconColor: "text-[#16a34a]",
    },
    {
      id: 3,
      title: "No Prior Experience",
      description: "Opportunities for every skill level",
      icon: <Users size={28} strokeWidth={2} />,
      cardBg: "bg-[#fefce8]", // Pastel Yellow
      iconBg: "bg-[#fef08a]",
      iconColor: "text-[#ca8a04]",
    },
    {
      id: 4,
      title: "Global Opportunities",
      description: "Jobs in 100+ countries",
      icon: <Globe size={28} strokeWidth={2} />,
      cardBg: "bg-[#fdf2f8]", // Pastel Pink
      iconBg: "bg-[#fce7f3]",
      iconColor: "text-[#db2777]",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 font-sans">
      
      {/* Heading Section */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
        How We <span className="text-[#2563eb]">Help You</span>
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`${feature.cardBg} p-4 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1`}
          >
            {/* Icon Circle */}
            <div
              className={`${feature.iconBg} ${feature.iconColor} w-14 h-14 rounded-full flex items-center justify-center mb-5`}
            >
              {feature.icon}
            </div>

            {/* Text Content */}
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-[13px] text-gray-600 leading-snug">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default HowWeHelp;