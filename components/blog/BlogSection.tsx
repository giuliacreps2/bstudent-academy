"use client";

import { useMemo, useState } from "react";
import { RegisterModal } from "@/components/auth/RegisterModal";
import { BlogFilters } from "./BlogFilters";
import { BlogGrid } from "./BlogGrid";
import { LoadMoreButton } from "./LoadMoreButton";
import { NewsletterBanner } from "./NewsletterBanner";
import type { BlogArticle, BlogCategoryKey } from "@/types/blog";

const INITIAL_VISIBLE = 8;
const LOAD_STEP = 8;

export function BlogSection({ articles }: { articles: BlogArticle[] }) {
  const [activeCategory, setActiveCategory] = useState<
    BlogCategoryKey | "tutti"
  >("tutti");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === "tutti") return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [articles, activeCategory]);

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(category: BlogCategoryKey | "tutti") {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleLoadMore() {
    setVisibleCount((current) => current + LOAD_STEP);
  }

  function handleRequireLogin() {
    setIsRegisterOpen(true);
  }

  return (
    <section className="pb-16 md:pb-20">
      <div className="container-section">
        <BlogFilters
          activeCategory={activeCategory}
          onChangeCategory={handleCategoryChange}
          onRequireLogin={handleRequireLogin}
        />

        <div className="mt-8">
          <BlogGrid
            articles={visibleArticles}
            onBookmark={handleRequireLogin}
          />
        </div>

        {hasMore && (
          <LoadMoreButton onClick={handleLoadMore} className="mt-10" />
        )}

        <div className="mt-16 md:mt-20">
          <NewsletterBanner />
        </div>
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </section>
  );
}
