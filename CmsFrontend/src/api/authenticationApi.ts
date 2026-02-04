export async function login(email: string, password: string): Promise<void> {
    const res = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(`Login failed (${res.status})`);
}