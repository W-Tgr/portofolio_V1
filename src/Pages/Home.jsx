import React, { useState, useEffect, useCallback, memo, useRef } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, MapPin, Calendar, User, Code } from "lucide-react"

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-[#161b22]/80 backdrop-blur-xl border border-[#30363d]">
        <span className="bg-gradient-to-r from-[#2188ff] to-[#58a6ff] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[#58a6ff]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#f0f6fc] via-[#c9d1d9] to-[#8b949e] bg-clip-text text-transparent">
          Software
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#2188ff] to-[#58a6ff] bg-clip-text text-transparent">
          Engineer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-md bg-[#161b22] backdrop-blur-sm border border-[#30363d] text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:border-[#2188ff] transition-all duration-200">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1f6feb] to-[#2188ff] rounded-md opacity-50 blur-sm group-hover:opacity-90 transition-all duration-300"></div>
      <div className="relative h-11 bg-[#0d1117] backdrop-blur-xl rounded-md border border-[#30363d] leading-none overflow-hidden group-hover:border-[#2188ff]">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-[#2188ff]/10 to-[#58a6ff]/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-[#f0f6fc] font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-[#c9d1d9] ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] rounded-md blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-md bg-[#161b22] backdrop-blur-xl p-2 flex items-center justify-center border border-[#30363d] group-hover:border-[#2188ff] transition-all duration-300">
        <Icon className="w-5 h-5 text-[#8b949e] group-hover:text-[#f0f6fc] transition-colors" />
      </div>
    </button>
  </a>
));

// ID Card Component
const IDCard = memo(() => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxTilt = 20;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;
    
    setRotation({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="relative z-10">
      {/* Lanyard */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-[#30363d] to-[#2188ff] shadow-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#161b22] rounded-b-md border border-[#30363d] flex justify-center items-end">
          <div className="w-2 h-2 bg-[#0d1117] rounded-full mb-1"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-[#21262d] rounded-t-md border border-[#30363d]"></div>
      </div>

      <div 
        ref={cardRef}
        className="relative w-72 h-[450px] cursor-pointer preserve-3d"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isFlipped ? 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.2s ease-out'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className={`relative w-full h-full bg-gradient-to-br from-[#161b22] via-[#21262d] to-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_50px_rgba(33,136,255,0.4)] hover:scale-105`}>
            
            {/* Header with Glow Effect */}
            <div className="relative h-20 bg-gradient-to-r from-[#1f6feb] via-[#2188ff] to-[#58a6ff] flex items-center justify-between px-5">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2188ff]/20 to-[#58a6ff]/20 blur-xl"></div>
              <div className="relative z-10">
                <h2 className="text-white font-bold text-base">SOFTWARE ENGINEER</h2>
                <p className="text-blue-100 text-xs opacity-90">Professional ID</p>
              </div>
              <div className="relative z-10">
                <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
              </div>
            </div>

            {/* Photo Section with 3:4 Aspect Ratio */}
            <div className="flex justify-center mt-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] rounded-2xl blur opacity-50"></div>
                <div className="relative w-28 h-36 bg-gradient-to-br from-[#30363d] to-[#21262d] rounded-2xl border-2 border-[#2188ff] overflow-hidden shadow-xl">
                  <img 
                    src="/Photo.jpg" 
                    alt="Profile Photo" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Photo Frame Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="px-5 mt-5 space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#f0f6fc] to-[#c9d1d9] bg-clip-text text-transparent">
                  Wilbert Tegar Putwandhawi
                </h3>
               
              </div>

              {/* Info Cards */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-[#21262d] rounded-lg p-2.5 border border-[#30363d]">
                  <MapPin className="w-3 h-3 text-[#2188ff]" />
                  <span className="text-[#c9d1d9] text-xs">Indonesia</span>
                </div>
                
                
              
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-[#2188ff] to-[#58a6ff] rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">VERIFIED DEVELOPER</span>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#58a6ff] rounded-full animate-pulse"></div>
            <div className="absolute bottom-14 left-3 w-1 h-1 bg-[#2188ff] rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className={`relative w-full h-full bg-gradient-to-br from-[#161b22] via-[#21262d] to-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_50px_rgba(33,136,255,0.4)] hover:scale-105`}>
            
            {/* Back Header */}
            <div className="h-16 bg-gradient-to-r from-[#58a6ff] to-[#2188ff] flex items-center justify-center">
              <h3 className="text-white font-bold text-base">CONTACT & SKILLS</h3>
            </div>

            <div className="p-5 space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <h4 className="text-[#f0f6fc] font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Mail className="w-3 h-3 text-[#2188ff]" />
                  Contact Information
                </h4>
                
                <a href="https://github.com/W-Tgr" className="flex items-center gap-2 bg-[#21262d] rounded-lg p-2.5 border border-[#30363d] hover:border-[#2188ff] transition-all duration-200">
                  <Github className="w-4 h-4 text-[#8b949e]" />
                  <span className="text-[#c9d1d9] text-xs">https://github.com/W-Tgr</span>
                </a>
                
                <a href="https://www.linkedin.com/in/wilberttgr/" className="flex items-center gap-2 bg-[#21262d] rounded-lg p-2.5 border border-[#30363d] hover:border-[#2188ff] transition-all duration-200">
                  <Linkedin className="w-4 h-4 text-[#8b949e]" />
                  <span className="text-[#c9d1d9] text-xs">linkedin.com/in/wilberttgr</span>
                </a>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-[#f0f6fc] font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Code className="w-3 h-3 text-[#2188ff]" />
                  Technical Skills
                </h4>
                
                <div className="grid grid-cols-2 gap-1.5">
                  {['React', 'Laravel', 'Flutter', 'JavaScript', 'PHP', 'Dart'].map((skill, index) => (
                    <div key={index} className="bg-gradient-to-r from-[#2188ff]/20 to-[#58a6ff]/20 rounded-lg p-1.5 border border-[#2188ff]/30">
                      <span className="text-[#c9d1d9] text-xs font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center mt-4">
                <div className="w-16 h-16 bg-[#21262d] border border-[#30363d] rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`w-1 h-1 rounded-sm ${i % 3 === 0 ? 'bg-[#2188ff]' : 'bg-[#30363d]'}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-center text-[#8b949e] text-xs">
                Click to flip • Portfolio QR Code
              </p>
            </div>

            {/* Back Corner Decorations */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#2188ff] rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-3 w-1 h-1 bg-[#58a6ff] rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Network & Telecom Student", "Tech Enthusiast"];
const TECH_STACK = ["Laravel", "React", "Flutter"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/W-Tgr" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/wilberttgr/" },
  { icon: Instagram, link: "https://www.instagram.com/wilbert_tgr?igsh=MTkzNGN3NmNwczR1Yg==" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#0d1117] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
      {/* GitHub-style animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2188ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#58a6ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#1f6feb] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-[#c9d1d9] to-[#f0f6fc] bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#2188ff] to-[#58a6ff] ml-1 animate-pulse"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-[#8b949e] max-w-xl leading-relaxed font-light">
                  Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - ID Card */}
            <div className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0">
              <IDCard />
              
              {/* Instruction Text */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default memo(Home);