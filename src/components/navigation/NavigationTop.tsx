import { useState, useEffect } from "react";
import { Icon } from "@iconify/react"; // 引入Search图标
import { Button } from "@/components/ui/button";

import { NavLinksConfig, SiteConfig } from "@/config";

export default function NavigationTop() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFloating, setIsFloating] = useState(false); // 监听滚动状态
  const [isDarkMode, setIsDarkMode] = useState(false); // 监听暗色模式
  const NavLinks = NavLinksConfig;

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFloating(true); // 当滚动距离大于50px时，导航栏悬浮
      } else {
        setIsFloating(false); // 吸附在顶部
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 监听暗色模式
  useEffect(() => {
    const handleDarkMode = () => {
      setIsDarkMode(
        document.documentElement.getAttribute("data-theme") === "dark"
      );
    };
    handleDarkMode();
    const observer = new MutationObserver(handleDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 font-satoshi">
      {" "}
      {/* 设置字体为Satoshi */}
      {/* 使用 sticky 保证实际占用空间 */}
      <div
        className={`transition-all border-b border-transparent dark:bg-gray-800 ${
          isFloating ? "dark:bg-gray-900 dark:shadow-lg" : ""
        }`}
        style={{
          width: isFloating ? "88%" : "100%", // 收缩宽度为 88%
          position: isFloating ? "fixed" : "relative", // 滚动时固定在顶部
          top: isFloating ? "10px" : "0", // 悬浮时距顶部 10px
          left: isFloating ? "6%" : "0", // 悬浮时居中
          backgroundColor: isFloating
            ? isDarkMode
              ? "rgba(31, 41, 55, 0.9)" // 暗色模式下的背景颜色
              : "rgba(255, 255, 255, 0.9)" // 亮色模式下的背景颜色
            : "rgba(255, 255, 255, 0)",
          boxShadow: isFloating ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none", // 轻微阴影
          borderRadius: isFloating ? "15px" : "0px", // 悬浮时增加圆角
          transition: "all 0.2s", // 简单的过渡效果
        }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* 左侧 logo 部分 */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-orange-500 dark:to-yellow-500 rounded-full" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-yellow-500">
              {SiteConfig.title}
            </span>
          </div>

          {/* 中间空出来的部分 */}
          <div className="flex-grow" />

          {/* 右侧导航栏链接和搜索按钮 */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              {NavLinks.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-all duration-150 ease-in-out hover:bg-purple-100 dark:hover:bg-gray-600"
                  >
                    {item.name}
                    {item.dropdownItems && (
                      <Icon
                        icon="mingcute:down-fill"
                        className="inline-block ml-1 w-4 h-4 dark:text-yellow-500"
                      />
                    )}
                  </a>
                  {item.dropdownItems && activeDropdown === item.name && (
                    <div
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20"
                      style={{ padding: "0.25rem" }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem}
                          href="#"
                          className="flex items-center justify-center text-base text-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out hover:bg-purple-100 dark:hover:bg-gray-600 rounded-md"
                          style={{
                            padding: "0.25rem 0.5rem",
                            margin: "0.25rem 0.25rem",
                          }}
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            {/* 小的搜索按钮 */}
            <Button variant="ghost" className="hover:bg-purple-100" size="icon">
              <Icon
                icon="mingcute:search-2-line"
                className="w-5 h-5 text-gray-700 dark:text-yellow-500"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
