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
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div>
            <h2 className="mt-0">Articles</h2>

            <div className="mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title/author…"
                    className="w-full p-2.5 border border-gray-300 rounded"
                />
            </div>

            {filtered.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <ul className="list-none p-0 m-0">
                    {filtered.map((a) => (
                        <li
                            key={a.id}
                            className="border border-gray-300 p-4 rounded-lg mb-3"
                        >
                            <h3 className="mt-0 mb-1.5">{a.title}</h3>
                            <div className="text-sm opacity-80 mb-2.5">
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
