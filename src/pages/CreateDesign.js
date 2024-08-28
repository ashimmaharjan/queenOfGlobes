import React, { useState } from "react";
import { HiTemplate } from "react-icons/hi";
import { FaShapes, FaUpload } from "react-icons/fa6";
import templates from "../utils/templates";
import { snowDesigns, bases } from "../utils/elements";

const CreateDesign = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Templates");
  const [projectName, setProjectName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const sideMenu = [
    {
      menuName: "Templates",
      icon: (
        <HiTemplate
          size={35}
          className={`${
            selectedMenuItem === "Templates"
              ? "text-[#85B6FF]"
              : "text-gray-400"
          }`}
        />
      ),
    },
    {
      menuName: "Elements",
      icon: (
        <FaShapes
          size={35}
          className={`${
            selectedMenuItem === "Elements" ? "text-[#85B6FF]" : "text-gray-400"
          }`}
        />
      ),
    },
    {
      menuName: "Uploads",
      icon: (
        <FaUpload
          size={35}
          className={`${
            selectedMenuItem === "Uploads" ? "text-[#85B6FF]" : "text-gray-400"
          }`}
        />
      ),
    },
  ];

  const handleMenuItemClick = (menuName) => {
    setSelectedMenuItem(menuName);
    console.log("User selected:", menuName);
  };

  const handleBaseClick = (base) => {
    setSelectedTemplate((prevTemplate) => ({
      ...prevTemplate,
      base: base.image,
    }));
  };

  return (
    <section>
      <div className="flex">
        {/* Naviagtion Drawer */}
        <div className="w-[390px] h-screen bg-[#776C8D]/40 shadow-lg border-2 border-gray-500 border-l-0 flex">
          {/* Side Menu */}
          <div className="w-[120px] h-full bg-[#83859b]/40 flex flex-col gap-3 items-center py-5">
            {sideMenu.map((menu, index) => (
              <button
                key={index}
                className={`flex flex-col justify-center items-center w-full h-auto py-2 space-y-1 ${
                  selectedMenuItem === menu.menuName
                    ? "text-[#85B6FF]"
                    : "text-gray-400"
                }`}
                onClick={() => handleMenuItemClick(menu.menuName)}
              >
                {menu.icon}
                <p className="text-[12px] font-bold">{menu.menuName}</p>
              </button>
            ))}
          </div>

          {/* Side Menu Items */}
          <div className="w-full h-auto flex flex-col box-border py-4 ml-4">
            {selectedMenuItem === "Templates" && (
              <div>
                <h3 className="text-lg font-bold text-white body-text">
                  Templates
                </h3>
                {templates.map((template, index) => (
                  <img
                    key={index}
                    src={template.thumbnailImage}
                    alt={template.templateName}
                    onClick={() => setSelectedTemplate(template)}
                    className="w-[180px] transition-all ease-in-out hover:bg-[#85B6FF] h-[144px] object-contain border border-white cursor-pointer rounded-lg shadow-md mt-3"
                  />
                ))}
              </div>
            )}

            {selectedMenuItem === "Elements" && (
              <div>
                <h3 className="text-lg font-bold text-white body-text">
                  Base Shape
                </h3>
                {bases.map((base, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm text-gray-400 mb-1">
                      {base.baseName}
                    </p>
                    <img
                      src={base.image}
                      alt={base.baseName}
                      onClick={() => handleBaseClick(base)}
                      className="w-[180px] transition-all p-5 ease-in-out hover:bg-[#85B6FF] h-[100px] object-contain border border-white cursor-pointer rounded-lg shadow-md"
                    />
                  </div>
                ))}

                <h3 className="text-lg font-bold text-white body-text mt-5">
                  Snow Designs
                </h3>
                {snowDesigns.map((snowDesign, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm text-gray-400 mb-1">
                      {snowDesign.snowDesign}
                    </p>
                    <img
                      src={snowDesign.image}
                      alt={snowDesign.snowDesign}
                      className="w-[180px] transition-all ease-in-out hover:ring-1 hover:ring-[#85B6FF] h-[100px] object-cover border border-white cursor-pointer rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Design Canvas */}
        <div className="w-full h-screen flex flex-col px-20">
          {/* Control Buttons */}
          <div className="flex items-center gap-8 w-full h-auto p-2">
            <a
              href="/designs"
              className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400"
            >
              Designs
            </a>

            <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400">
              Save
            </button>

            <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400">
              Submit
            </button>
          </div>

          {/* Design Canvas */}
          <div className="w-full">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="text-[25px] text-white font-bold bg-transparent border-b border-white outline-none w-full mt-10"
            />

            <div className="w-full h-[500px] bg-gray-800/50 text-white mt-5 flex flex-col justify-center items-center">
              {Object.keys(selectedTemplate).length === 0 ? (
                <p className="text-3xl font-bold">
                  Please select a template to begin.
                </p>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-xl mb-5 text-left bg-sky-600/70 px-5 py-[10px]">
                    {selectedTemplate.templateName}
                  </h3>
                  {/* Snow Globe */}
                  <img
                    src={selectedTemplate.globe}
                    alt={selectedTemplate.templateName}
                    className="object-contain w-52 h-52 z-10 border-black border"
                  />
                  {/* Snow Glow Base */}
                  <img
                    src={selectedTemplate.base}
                    alt={selectedTemplate.templateName}
                    className="w-52 h-24 object-contain -mt-7 z-0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDesign;
