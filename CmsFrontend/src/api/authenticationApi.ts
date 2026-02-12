//Login function
export async function login(email: string, password: string): Promise<any> {
    //Fetch the login API, sends email and password to the backend
    const res = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    //Gets the token and username from the backend
    const data = await res.json();

    //Stores the token and username in local storage
    if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
    }
    return data;
}

//Sign up function
export async function signup(email: string, username: string, password: string): Promise<any> {
    //Fetch the signup API, sends email, username and password to the backend
    const res = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
    });
    if (!res.ok) {
        throw new Error("Signup failed");
    }
    
    //Gets the token and username from the backend
    const data = await res.json();

    //Stores the token and username in local storage
    if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
    }
    return data;
}