import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getArticle } from "../api/articlesApi";

export default function EditArticlePage() {
    const { id } = useParams();
    const articleId = Number(id);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch the existing data (Viewing/Processing flow)
    useEffect(() => {
        const loadArticle = async () => {
            try {
                const data = await getArticle(articleId);
                setTitle(data.title);
                setContent(data.contentHtml);
                setAuthorName(data.authorName);
                setLoading(false);
            } catch (err) {
                setError("Could not load article data.");
                setLoading(false);
            }
        };
        loadArticle();
    }, [articleId]);

    // Handle the Update (Processing flow)
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        const updatedData = {
            id: articleId,
            title: title,
            contentHtml: content,
            authorName: authorName,
            updatedAtUtc: new Date().toISOString()
        };

        try {
            const response = await fetch(`/api/articles/${articleId}`, {
                method: "PUT", // Matches the [HttpPut] in ArticlesApiController
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                navigate(`/articles/${articleId}`);
            } else {
                setError("Failed to update article. Check your authorization.");
            }
        } catch (err) {
            setError("An error occurred while saving.");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight m-0">
                            Edit Article
                        </h2>
                        <p className="mt-1 text-slate-600">
                            Update the title or content, then save your changes.
                        </p>
                    </div>

                    <span className="rounded-full border border-[var(--brand-aqua)] bg-[var(--brand-cream)] px-3 py-1 text-sm font-semibold text-slate-800">
                        Admin
                    </span>
                </div>
            </div>

            {/* Form Card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700">
                            Article Title
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Content
                        </label>

                        <div className="overflow-hidden rounded-2xl border border-slate-200">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-[var(--brand-pink)] px-5 py-2.5 font-semibold text-white shadow-sm hover:opacity-90 transition"
                        >
                            Update Article
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/articles")}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}