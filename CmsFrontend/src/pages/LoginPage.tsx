import { useState } from "react";
import { login } from "../api/authenticationApi";

export default function LoginPage() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const Login = async () => {
        try {
            await login(Email, Password);
            console.log("Login successful");
        } catch (error) {
            console.error("Login failed", error);
        }
    }
    return (
        <>
            <div>
                <input type="email" placeholder="Email" className="border rounded-2xl p-2 mb-4 w-full" required value={Email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border rounded-2xl p-2 mb-4 w-full" required value={Password} onChange={e => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white p-2 w-full" onClick={Login}>Login</button>
            </div>
        </>
    )
}