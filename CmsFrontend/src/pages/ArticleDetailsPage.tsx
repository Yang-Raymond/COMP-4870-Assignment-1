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

    if (loading) return <p>Loading…</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (!article) return <p>Article not found.</p>;

    return (
        <div>
            <Link to="/articles">← Back to articles</Link>

            <h2 className="mb-1.5">{article.title}</h2>
            <div className="text-sm opacity-80 mb-5">
                By {article.authorName || "unknown"} •{" "}
                {new Date(article.createdAtUtc).toLocaleString()}
            </div>

            <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
        </div>
    );
}
