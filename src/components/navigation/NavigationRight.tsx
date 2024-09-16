import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

import { SiteConfig, SocialLinkConfig } from "@/config";

export default function NavigationRight() {
  return (
    <aside className="lg:w-1/6 lg:sticky lg:top-24 lg:self-start">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <div className="text-center relative">
          <a href="/about" className="block relative group">
            <Avatar className="w-32 h-32 mx-auto mb-4 relative">
              <AvatarImage src={SiteConfig.avatar} alt="Profile_Picture" />
              <AvatarFallback>{SiteConfig.ownerName}</AvatarFallback>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full"
              >
                <Icon
                  icon="mdi:card-account-details-outline"
                  className="h-10 w-10 text-white"
                />
              </motion.div>
            </Avatar>
          </a>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {SiteConfig.ownerName}
          </h1>
          <p className="text-gray-600 mt-2">{SiteConfig.description}</p>
        </div>

        <div className="flex justify-center space-x-4">
          {SocialLinkConfig.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="ghost" size="icon" asChild>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  <Icon icon={link.icon} className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
