import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api/articlesApi";
import type { Article } from "../types/Article";

// Displays a searchable list of all articles with title and author filtering.
export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    // Fetch all articles when component mounts.
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

    // Filter articles by search query on title and author name.
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return articles;
        return articles.filter((a) =>
            [a.title, a.authorName].some((v) => v?.toLowerCase().includes(q))
        );
    }, [articles, query]);

    // Show loading state while fetching articles.
    if (loading) return <p>Loading articles…</p>;
    // Show error message if fetch failed.
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className="space-y-6">
            <div className="card card-pad">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight m-0">Articles</h2>
                        <p className="mt-1 text-slate-600">
                            Browse posts fetched from the ASP.NET REST API.
                        </p>
                    </div>
                    <div className="badge">
                        {filtered.length} shown
                    </div>
                </div>

                <div className="mt-5">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title/author…"
                        className="input"
                    />
                </div>
            </div>

            {/* Show empty state when no articles match the search query. */}
            {filtered.length === 0 ? (
                <div className="card card-pad">
                    No articles found.
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((a) => (
                        <div key={a.id} className="card card-pad">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-extrabold m-0">{a.title}</h3>
                                    <div className="mt-2 text-sm text-slate-600">
                                        By <span className="font-semibold text-slate-800">{a.authorName || "unknown"}</span> •{" "}
                                        {new Date(a.createdAtUtc + "Z").toLocaleString()}
                                    </div>
                                </div>
                                <Link
                                    to={`/articles/${a.id}`}
                                    className="btn-primary-sm"
                                >
                                    Read →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}