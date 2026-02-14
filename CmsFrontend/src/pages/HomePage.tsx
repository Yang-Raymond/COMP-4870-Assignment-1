import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Article } from "../types/Article";
import { getArticles } from "../api/articlesApi";

// Remove HTML tags from string for plain text display.
function stripHtml(html: string) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

// Truncate text to max length and append ellipsis if necessary.
function excerpt(text: string, max = 140) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

// Displays homepage with hero section and 3 most recent articles.
export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch all articles when component mounts.
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setErrorMsg("");
        setLoading(true);

        const data = await getArticles();
        if (!mounted) return;

        setArticles(data);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setErrorMsg("Could not load recent articles.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Sort articles by date and return the 3 most recent.
  const recent = useMemo(() => {
    return [...articles]
      .sort(
        (a, b) =>
          new Date(b.createdAtUtc).getTime() -
          new Date(a.createdAtUtc).getTime(),
      )
      .slice(0, 3);
  }, [articles]);

  return (
    <div className="container">
      {/* Hero */}
      <section className="card w-full max-w-5xl mx-auto">
        <div className="p-10 md:p-12">
          <h1 className="text-5xl font-extrabold tracking-tight">Mini-CMS</h1>

          <p className="mt-4 text-lg leading-8 text-(--muted) max-w-3xl">
            A simple content platform built with ASP.NET + SQLite + React.
            Browse articles, view rich text content, and manage posts through
            the admin area.
          </p>

          <div className="mt-6 flex gap-3">
            <Link to="/articles" className="btn-primary">
              Browse Articles →
            </Link>

            <Link
              to="http://localhost:5002/Identity/Account/Login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <div className="mt-12 recent-wrap">
        <div className="section-header">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Recent Articles
            </h2>
            <p className="section-subtext">
              The latest posts added to Mini-CMS.
            </p>
          </div>
        </div>

        {/* Display error message if fetch failed. */}
        {errorMsg && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="grid-3 recent-grid">
          {/* Show skeleton loaders while fetching articles. */}
          {loading &&
            [0, 1, 2].map((i) => (
              <div key={i} className="card p-6">
                <div
                  style={{
                    height: 18,
                    width: "65%",
                    borderRadius: 8,
                    background: "var(--border)",
                    opacity: 0.6,
                    marginBottom: 14,
                  }}
                />
                <div
                  style={{
                    height: 12,
                    width: "45%",
                    borderRadius: 8,
                    background: "var(--border)",
                    opacity: 0.5,
                    marginBottom: 16,
                  }}
                />
                <div
                  style={{
                    height: 12,
                    width: "100%",
                    borderRadius: 8,
                    background: "var(--border)",
                    opacity: 0.4,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    height: 12,
                    width: "92%",
                    borderRadius: 8,
                    background: "var(--border)",
                    opacity: 0.4,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    height: 12,
                    width: "80%",
                    borderRadius: 8,
                    background: "var(--border)",
                    opacity: 0.4,
                  }}
                />
              </div>
            ))}

          {/* Display article cards once loaded. */}
          {!loading &&
            recent.map((a) => {
              const plain = stripHtml(a.contentHtml ?? "");
              const short = excerpt(plain, 150);
              const date = new Date(a.createdAtUtc + "Z").toLocaleString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <Link
                  key={a.id}
                  to={`/articles/${a.id}`}
                  className="card article-card"
                >
                  <div className="article-top">
                    <div className="article-badge">New</div>
                    <div className="article-meta">
                      <span className="article-author">By {a.authorName}</span>
                      <span className="article-dot">•</span>
                      <span className="article-date">{date}</span>
                    </div>
                  </div>

                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">
                    {short || "No preview available."}
                  </p>

                  <div className="article-footer" aria-hidden="true">
                    <span className="article-read">
                      Read article <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}

          {/* Show empty state if no articles exist. */}
          {!loading && recent.length === 0 && !errorMsg && (
            <div className="card p-6" style={{ gridColumn: "1 / -1" }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>No articles yet</h3>
              <p style={{ marginTop: 6, color: "var(--muted)" }}>
                Create your first article to have it appear here.
              </p>
              <Link
                to="/articles"
                className="btn-primary"
                style={{ marginTop: 12 }}
              >
                Browse Articles
              </Link>
            </div>
          )}
        </div>
        {/* Decorative graphics */}
        <div className="recent-decor" aria-hidden="true">
          <img
            className="recent-mountains"
            src="/images/mountains.png"
            alt=""
          />
          <img className="recent-penguin" src="/images/penguin.png" alt="" />
        </div>
      </div>
    </div>
  );
}
