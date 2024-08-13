import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { label: "Home", link: "/" },
    { label: "Gallery", link: "/gallery" },
    { label: "About", link: "/about" },
    { label: "Shop", link: "/shop" },
    { label: "Sign In", link: "/signin" },
  ];

  const socialLinks = [
    { site: "facebook", icon: <FaFacebook /> },
    { site: "instagram", icon: <FaInstagram /> },
    { site: "linkedin", icon: <FaLinkedin /> },
  ];

  return (
    <nav
      className={`transition-all duration-300 ease-in-out fixed
      ${isScrolled ? "bg-black/60 top-0 z-50" : "bg-transparent"}
      flex justify-between items-center w-screen px-10 py-5 text-white`}
    >
      <a href="/" className="font-serif text-[40px] leading-[68px] heading">
        Queen of Snow Globes
      </a>

      <div className="flex items-center gap-8">
        {links.map((link, index) => (
          <Link key={index} to={link.link} className="text-xl">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {socialLinks.map((socialLink, index) => (
          <a
            className="text-2xl"
            key={index}
            href={`https://${socialLink.site}.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialLink.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
