import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../api/articlesApi";
import type { Article } from "../types/Article";

export default function ArticleDetailsPage() {
  const { id } = useParams();
  const articleId = Number(id);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status to show/hide Admin features
  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!Number.isFinite(articleId)) {
        setError("Invalid article id");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getArticle(articleId);
        if (isMounted) setArticle(data);
      } catch (e) {
        if (isMounted)
          setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [articleId]);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading article...</div>
    );
  if (error)
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (!article)
    return (
      <div className="p-8 text-center text-gray-500">Article not found.</div>
    );

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/articles"
          className="btn-ghost hover:brightness-95 transition-colors"
        >
          ← Back to articles
        </Link>
      </div>

      <header className="mb-10 border-b border-(--border) pb-8">
        <h1 className="text-4xl font-bold text-(--text) mb-4 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center text-sm text-(--muted)">
          <span className="font-semibold text-(--text)">
            {article.authorName || "Anonymous"}
          </span>
          <span className="mx-2">•</span>
          <time dateTime={article.createdAtUtc}>
            {new Date(article.createdAtUtc + "Z").toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </time>
        </div>
      </header>

      <div
        className="rich-text-content leading-relaxed text-(--text) text-lg space-y-4"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </article>
  );
}
