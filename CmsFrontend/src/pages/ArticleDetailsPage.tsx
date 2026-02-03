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
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!article) return <p>Article not found.</p>;

    return (
        <div>
            <Link to="/articles">← Back to articles</Link>

            <h2 style={{ marginBottom: 6 }}>{article.title}</h2>
            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 18 }}>
                By {article.authorName || "unknown"} •{" "}
                {new Date(article.createdAtUtc).toLocaleString()}
            </div>

            <div
                style={{ lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
        </div>
    );
}
