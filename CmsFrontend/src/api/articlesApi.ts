import type { Article } from "../types/Article";


const BASE_URL = "/api/articles";

// Revised helper to avoid TypeScript HeaderInit errors
const getHeaders = () => {
    const token = localStorage.getItem("authToken");
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

export async function getArticles(): Promise<Article[]> {
    const res = await fetch("/api/articles");
    if (!res.ok) throw new Error(`Failed to fetch articles (${res.status})`);
    return res.json();
}

export async function getArticle(id: number): Promise<Article> {
    const res = await fetch(`/api/articles/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch article (${res.status})`);
    return res.json();
}

// New API functions for create, update, delete
export async function createArticle(article: Partial<Article>): Promise<Article> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: getHeaders(), // Use the unified header helper
        body: JSON.stringify(article)
    });
    if (!res.ok) throw new Error("Failed to create article");
    return res.json();
}

export async function updateArticle(id: number, article: Partial<Article>): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(article)
    });
    if (!res.ok) throw new Error("Failed to update article");
}

export async function deleteArticle(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete article");
}