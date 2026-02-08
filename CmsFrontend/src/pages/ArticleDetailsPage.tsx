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
    
    // Check authentication status to show/hide Admin features [cite: 54]
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading article...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    if (!article) return <div className="p-8 text-center text-gray-500">Article not found.</div>;

    return (
        <article className="max-w-3xl mx-auto px-6 py-12 font-sans">
            <div className="flex justify-between items-center mb-8">
                <Link 
                    to="/articles" 
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium inline-flex items-center gap-1"
                >
                    ← Back to articles
                </Link>

                {/* Conditional Edit Button for Admins  */}
                {isAuthenticated && (
                    <Link 
                        to={`/admin/edit/${article.id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        Edit Article
                    </Link>
                )}
            </div>

            <header className="mb-10 border-b border-gray-100 pb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                    {article.title}
                </h1>
                
                <div className="flex items-center text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">
                        {article.authorName || "Anonymous"}
                    </span>
                    <span className="mx-2">•</span>
                    <time dateTime={article.createdAtUtc}>
                        {new Date(article.createdAtUtc).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>
            </header>

            {/* Rich Text Display Logic [cite: 62, 65] */}
            <div
                className="rich-text-content leading-relaxed text-gray-800 text-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
            />
        </article>
    );
}