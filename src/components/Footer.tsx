import { motion } from "framer-motion";

import { SiteConfig } from "@/config";

export default function Footer() {
  const linkClass = "link text-pink-500 font-medium";

  return (
    <footer className="w-[77%] bg-white rounded-lg shadow-lg m-4 mx-auto dark:bg-gray-900">
      <div className="px-4 py-8 mx-auto max-w-screen-xl">
        <div className="block text-sm text-gray-500 text-center dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} {SiteConfig.ownerName}. All Rights
            Reserved.
          </p>
          <p className="mt-2">
            Powered by{" "}
            <motion.a
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mx-space"
              whileHover={{ scale: 1.1, color: "rgb(22, 163, 74)" }}
            >
              Mix Space
            </motion.a>{" "}
            &{" "}
            <motion.a
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/TNXG/Tomori"
              whileHover={{ scale: 1.1, color: "rgb(22, 163, 74)" }}
            >
              Tomori
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  );
}