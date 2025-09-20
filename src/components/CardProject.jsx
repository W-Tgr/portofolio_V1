import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
 
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
 
  return (
    <div className="group relative w-full">
           
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d1117]/90 to-[#161b22]/90 backdrop-blur-lg border border-[#30363d] shadow-2xl transition-all duration-300 hover:shadow-[#2188ff]/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2188ff]/10 via-[#58a6ff]/10 to-[#1f6feb]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
   
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
         
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-[#2188ff] to-[#58a6ff] bg-clip-text text-transparent">
              {Title}
            </h3>
           
            <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
           
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-[#58a6ff] hover:text-[#2188ff] transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-[#8b949e] text-sm">Demo Not Available</span>
              )}
             
    
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#161b22]/80 hover:bg-[#21262d]/80 text-[#f0f6fc]/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2188ff]/50 border border-[#30363d] hover:border-[#2188ff]/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-[#8b949e] text-sm">Details Not Available</span>
              )}
            </div>
          </div>
         
          <div className="absolute inset-0 border border-[#30363d]/0 group-hover:border-[#2188ff]/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};
export default CardProject;