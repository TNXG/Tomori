import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronDown } from "lucide-react";

import { NavLinksConfig, SiteConfig } from "@/config";

import NavSearch from "@/components/navigation/NavSearch";

export default function NavigationTop() {
  const [isMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const NavLinks = NavLinksConfig;
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {SiteConfig.title}
          </span>
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {NavLinks.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.a
                href={item.href}
                className="text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-150 ease-in-out"
                whileHover={{
                  backgroundColor: "#F3E8FF",
                  borderRadius: "0.75rem",
                }}
              >
                {item.name}
                {item.dropdownItems && (
                  <ChevronDown className="inline-block ml-1 w-4 h-4" />
                )}
              </motion.a>
              {item.dropdownItems && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-20"
                      style={{ padding: "0.5rem" }} // 外层卡片的 padding
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <motion.a
                          key={dropdownItem}
                          href="#"
                          className="flex items-center justify-center text-sm text-gray-700 transition-all duration-150 ease-in-out"
                          style={{
                            padding: "0.25rem 0.5rem",
                            margin: "0 0.25rem",
                          }} // 内部按钮的固定大小和边距
                          whileHover={{
                            backgroundColor: "#F3E8FF",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {dropdownItem}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
        <NavSearch />
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
            className="md:hidden bg-white shadow-lg absolute w-full"
          >
            <nav className="container mx-auto px-4 py-4">
              {NavLinks.map((item) => (
                <div key={item.name} className="py-2">
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-purple-600 font-medium block"
                  >
                    {item.name}
                  </a>
                  {item.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem}
                          href="#"
                          className="text-sm text-gray-600 hover:text-purple-600 block"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
