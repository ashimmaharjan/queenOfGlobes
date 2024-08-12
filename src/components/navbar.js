import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Gallery",
      link: "/gallery",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Shop",
      link: "/shop",
    },
    {
      label: "Sign In",
      link: "/signin",
    },
  ];

  const socialLinks = [
    {
      site: "facebook",
      icon: <FaFacebook />,
    },
    {
      site: "instagram",
      icon: <FaInstagram />,
    },
    {
      site: "linkedin",
      icon: <FaLinkedin />,
    },
  ];
  return (
    <nav className="w-full h-[5vh] flex justify-between items-center p-10 text-white">
      <h2 className="font-serif text-[40px] leading-[68px] heading">
        Queen of Snow Globes
      </h2>

      <div className="flex items-center gap-8">
        {links.map((link, index) => (
          <Link key={index} to={link.link} className="text-xl">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {socialLinks.map((socialLink, index) => (
          <a className="text-2xl" key={index} href={socialLink.site}>
            {socialLink.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
