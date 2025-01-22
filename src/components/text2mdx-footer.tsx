"use client";

import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function Text2mdxFooter() {
  return (
    <motion.footer
      className="w-full py-6 px-4 bg-transparent text-gray-300 absolute bottom-0 left-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm mb-2 sm:mb-0">
          © {new Date().getFullYear()} Text2MDX. All rights reserved.
        </p>
        <motion.a
          href="https://www.buymeacoffee.com/cwd.harshit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm hover:text-white transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Coffee
            className="mr-2 text-yellow-600 hover:text-yellow-500"
            size={20}
          />
          Buy me a coffee
        </motion.a>
        <motion.a
          href="https://github.com/c-w-d-harshit/text2mdx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm hover:text-white transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="mr-2 text-lg" />
          Open Source on GitHub
        </motion.a>
      </div>
    </motion.footer>
  );
}
