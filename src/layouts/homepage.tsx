import type { BlogItem } from "@/lib/utils";

import NavigationTop from "@/components/navigation/NavigationTop";
import NavigationRight from "@/components/navigation/NavigationRight";
import ArticlesStreamPanel from "@/components/ArticlesStreamPanel";
import Footer from "@/components/Footer";

// 接收 articles 作为 props
export default function HomePage({ articles }: { articles: BlogItem[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <NavigationTop />
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <NavigationRight />
        <main className="lg:w-3/4 space-y-8">
          {/* 将 articles 传递给 ArticlesStreamPanel 组件 */}
          <ArticlesStreamPanel articles={articles} />
        </main>
      </div>
      <Footer />
      <br />
    </div>
  );
}
