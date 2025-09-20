import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#0d1117]"
                    : scrolled
                    ? "bg-[#0d1117]/80 backdrop-blur-xl border-b border-[#30363d]"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold bg-gradient-to-r from-[#2188ff] to-[#58a6ff] bg-clip-text text-transparent hover:from-[#58a6ff] hover:to-[#2188ff] transition-all duration-300"
                        >
                            Wilbert Tegar
                        </a>
                    </div>
        
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "text-[#2188ff] font-semibold"
                                                : "text-[#f0f6fc] group-hover:text-[#58a6ff]"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2188ff] to-[#58a6ff] transform origin-left transition-transform duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
        
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#f0f6fc] hover:text-[#58a6ff] transition-all duration-300 ease-in-out transform hover:bg-[#21262d] rounded-md ${
                                isOpen ? "rotate-90 scale-125 bg-[#21262d]" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        
            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out border-t border-[#30363d] bg-[#161b22] ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease rounded-md hover:bg-[#21262d] ${
                                activeSection === item.href.substring(1)
                                    ? "text-[#2188ff] font-semibold bg-[#21262d] border-l-2 border-[#2188ff]"
                                    : "text-[#f0f6fc] hover:text-[#58a6ff]"
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;