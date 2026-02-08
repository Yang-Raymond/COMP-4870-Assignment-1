import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Retrieve the JWT token stored during login
        const token = localStorage.getItem("authToken");

        const articleData = {
            title: title,
            contentHtml: content, // Matches the property name in ArticlesApiController
            authorName: "admin"   // Hardcoded for now as per your Razor logic
        };

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Sends the token to the [Authorize] API
                },
                body: JSON.stringify(articleData)
            });

            if (response.ok) {
                // Successful Drafting -> Processing flow [cite: 26]
                navigate("/articles");
            } else {
                setError("Failed to save article. Ensure you are logged in.");
            }
        } catch (err) {
            setError("An error occurred while connecting to the server.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Article Title</label>
                    <input 
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    {/* Rich Text Editor Integration [cite: 53] */}
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
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create Article
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