import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api/articlesApi";
import type { Article } from "../types/Article";

export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                setLoading(true);
                const data = await getArticles();
                if (isMounted) setArticles(data);
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
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return articles;
        return articles.filter((a) =>
            [a.title, a.authorName].some((v) => v?.toLowerCase().includes(q))
        );
    }, [articles, query]);

    if (loading) return <p>Loading articles…</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;

    return (
        <div>
            <h2 style={{ marginTop: 0 }}>Articles</h2>

            <div style={{ marginBottom: 16 }}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title/author…"
                    style={{ width: "100%", padding: 10 }}
                />
            </div>

            {filtered.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {filtered.map((a) => (
                        <li
                            key={a.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: 16,
                                borderRadius: 10,
                                marginBottom: 12,
                            }}
                        >
                            <h3 style={{ marginTop: 0, marginBottom: 6 }}>{a.title}</h3>
                            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>
                                By {a.authorName || "unknown"} •{" "}
                                {new Date(a.createdAtUtc).toLocaleString()}
                            </div>
                            <Link to={`/articles/${a.id}`}>Read →</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
