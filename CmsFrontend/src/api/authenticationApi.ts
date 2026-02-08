// Change return type from Promise<void> to Promise<any> or a specific interface
export async function login(email: string, password: string): Promise<any> {
    const res = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        // This will be caught by the 'catch' block in LoginPage.tsx
        throw new Error("Invalid credentials");
    }

    const data = await res.json();

    if (data.token) {
        // Storing locally is correct for a decoupled architecture [cite: 11]
        localStorage.setItem("authToken", data.token);
        console.log("Token stored:", data.token);
    }

    // CRITICAL: Return the data so LoginPage can "see" it
    return data;
}

export async function signup(email: string, password: string): Promise<any> {
    const res = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        throw new Error("Signup failed");
    }
    
    const data = await res.json();

    if (data.token) {
        // Storing locally is correct for a decoupled architecture [cite: 11]
        localStorage.setItem("authToken", data.token);
        console.log("Token stored:", data.token);
    }
    return data;
}