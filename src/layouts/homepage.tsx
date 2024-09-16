import NavigationTop from "@/components/navigation/NavigationTop";
import NavigationRight from "@/components/navigation/NavigationRight";
import ArticlesStreamPanel from "@/components/ArticlesStreamPanel";
import Footer from "@/components/Footer";
import type { PostModel } from "@mx-space/api-client";

// 接收 articles 作为 props
export default function HomePage({ articles }: { articles: PostModel[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
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
