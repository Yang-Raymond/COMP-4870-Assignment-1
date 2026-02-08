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

    // Step 1: Fetch the existing data (Viewing/Processing flow)
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

    // Step 2: Handle the Update (Processing flow)
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
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Article Title</label>
                    <input 
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <div className="h-96 mb-12"> 
                        <ReactQuill 
                            theme="snow" 
                            value={content} 
                            onChange={setContent}
                            className="h-full"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        type="submit" 
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Update Article
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate("/articles")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}