import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Mail, Zap, User, ExternalLink, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';

const teamMembers = [
  {
    id: 1,
    name: "Sudarshan Patil",
    role: "Lead Full Stack Developer",
    image: "/images/team/sudarshan.png",
    bio: "Passionate about building AI-driven solutions for modern agriculture.",
    contact: {
      github: "https://github.com/Sudarshan045",
      phone: "tel:9529998143",
      email: "mailto:sudarshanpatil0945@gmail.com"
    }
  },
  {
    id: 2,
    name: "Shrivardhan Patil",
    role: "Backend & API Engineer",
    image: "/images/team/shrivardhan.png",
    bio: "Expert in scalable backend architectures and agricultural data analysis.",
    contact: {
      github: "https://github.com/Shrivardhan5306",
      phone: "tel:7620599625",
      email: "mailto:patilshree536@gmail.com"
    }
  },
  {
    id: 3,
    name: "Sanskar Patil",
    role: "Frontend & UI/UX Specialist",
    image: "/images/team/sanskar.png",
    bio: "Focused on creating intuitive and accessible interfaces for farmers.",
    contact: {
      github: "#",
      phone: "tel:9284765617",
      email: "mailto:sanskarpatil1919@gmail.com"
    }
  },
  {
    id: 4,
    name: "Pruthviraj Pawar",
    role: "Researcher & Data Analyst",
    image: "/images/team/pruthviraj.png",
    bio: "Specializes in crop disease research and AI model optimization.",
    contact: {
      github: "https://github.com/Pruthviraj-dev",
      phone: "tel:8956658646",
      email: "mailto:pruthviraj@example.com"
    }
  }
];

const TeamMemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glass p-6 rounded-2xl hover-glow flex flex-col items-center text-center group"
  >
    <div className="relative mb-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500/30 group-hover:border-green-500 transition-colors duration-300">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg">
        <User size={16} />
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
    <p className="text-green-600 font-medium mb-3">
      <TranslatedText>{member.role}</TranslatedText>
    </p>
    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
      <TranslatedText>{member.bio}</TranslatedText>
    </p>
    
    <div className="flex gap-4 mt-auto">
      {member.contact.github !== "#" && (
        <a href={member.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors" title="Github">
          <Globe size={20} />
        </a>
      )}
      <a href={member.contact.phone} className="text-gray-500 hover:text-green-600 transition-colors" title="Phone">
        <Phone size={20} />
      </a>
      <a href={member.contact.email} className="text-gray-500 hover:text-green-600 transition-colors" title="Email">
        <Mail size={20} />
      </a>
    </div>
  </motion.div>
);

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <TranslatedText>Meet Our</TranslatedText> <span className="gradient-text"><TranslatedText>Incredible Team</TranslatedText></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            <TranslatedText>We are a group of dedicated students working towards modernizing agriculture through technology. Our mission is to empower farmers with AI-driven insights.</TranslatedText>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-24 p-8 glass rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-amber-500"></div>
          <h2 className="text-3xl font-bold mb-6"><TranslatedText>Our Mission</TranslatedText></h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            <TranslatedText>Smart Krishi is born out of a desire to bridge the gap between traditional farming and modern technology. By leveraging Artificial Intelligence, we aim to provide farmers with real-time advice, disease detection, and market trends, all in their local language.</TranslatedText>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
