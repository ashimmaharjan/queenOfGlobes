import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import userImage from "../images/user-image.jpeg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const sessionId = sessionStorage.getItem("sessionId");

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
        {sessionId !== null ? "CaseCrafter" : "Queen of Snow Globes"}
      </a>

      <div className="flex items-center gap-8">
        {links.map((link, index) => (
          <Link key={index} to={link.link} className="text-xl">
            {link.label}
          </Link>
        ))}

        {!sessionId && (
          <Link to="/signin" className="text-xl">
            Sign In
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {sessionId && (
          <div className="w-10 h-10 rounded-full bg-[#D9D9D9] p-[2px] overflow-hidden cursor-pointer">
            <img
              src={userImage}
              className="object-cover w-full h-full rounded-full"
              alt="/user-image"
              srcset=""
            />
          </div>
        )}

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
