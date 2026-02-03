import type { Article } from "../types/Article";

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
