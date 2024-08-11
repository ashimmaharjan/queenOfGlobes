import logo from "./logo.svg";
import "./App.css";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

function App() {
  const links = [
    {
      label: "Home",
      link: "/home",
    },
    {
      label: "Gallery",
      link: "/home",
    },
    {
      label: "About",
      link: "/home",
    },
    {
      label: "Shop",
      link: "/home",
    },
    {
      label: "Sign In",
      link: "/home",
    },
  ];

  const socialLinks = [
    {
      site: "facebook",
      icon: <RiFacebookBoxFill />,
    },
    {
      site: "facebook",
      icon: <RiInstagramFill />,
    },
    {
      site: "facebook",
      icon: <RiLinkedinBoxFill />,
    },
  ];
  return (
    <main>
      <section>
        <nav className="w-full h-10 bg-gray-800 flex justify-between items-center p-10 text-white">
          <h2 className="font-serif text-xl">Quuen of Snow Globes</h2>

          <div className="flex items-center gap-8">
            {links.map((link, index) => (
              <a key={index} href={link.link}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((socialLink, index) => (
              <a className="text-2xl" key={index} href={socialLink.site}>
                {socialLink.icon}
              </a>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}

export default App;
