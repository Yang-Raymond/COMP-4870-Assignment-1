import type { Article } from "../types/Article";

// Fetch all articles from the backend API.
export async function getArticles(): Promise<Article[]> {
    const res = await fetch("/api/articles");
    // Throw error if the request failed.
    if (!res.ok) throw new Error(`Failed to fetch articles (${res.status})`);
    return res.json();
}

// Fetch a single article by ID from the backend API.
export async function getArticle(id: number): Promise<Article> {
    const res = await fetch(`/api/articles/${id}`);
    // Throw error if the request failed.
    if (!res.ok) throw new Error(`Failed to fetch article (${res.status})`);
    return res.json();
}