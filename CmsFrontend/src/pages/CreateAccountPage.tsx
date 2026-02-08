import { useState } from "react";
import { signup } from "../api/authenticationApi";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccountPage() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const CreateAccount = async () => {
        try {
            setErrorMsg(""); // Reset error state
            const response = await signup(Email, Password);

            // 1. Store the token for future API calls
            // Assuming your API returns { token: "..." }
            if (response) {
                localStorage.setItem("token", response.token);
            }

            navigate("/articles");
        } catch (error) {
            console.error("Signup failed", error);
            setErrorMsg("Invalid email or password.");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-260 rounded-3xl flex flex-col md:flex-row p-6 md:p-0 md:gap-12 border border-gray-200 shadow">
                <div className="flex-1 flex flex-col pt-4 md:py-12 md:pl-12">
                    <div className="mb-4 text-4xl">
                        <h1>
                            Mini-CMS
                        </h1>
                    </div>
                    <h1 className="text-4xl font-normal mb-2">Sign up</h1>
                    <p className="text-xl font-normal">to continue to Mini-CMS</p>
                </div>
                <div className="flex-1 flex flex-col md:py-12 md:pr-12 max-w-md mx-auto w-full">
                    <div className="mt-8 md:mt-0 space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="block px-4 py-3 w-full text-base bg-transparent rounded border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] peer"
                                placeholder="Email"
                                required
                                value={Email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className="block px-4 py-3 w-full text-base bg-transparent rounded border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] peer"
                                placeholder="Password"
                                required
                                value={Password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-12">
                        <Link to="/login" className="text-[#000000] text-sm font-medium hover:text-[#68686d] hover:bg-white/5 py-2 px-3 rounded transition-colors">
                            Already have an account?<br/> Login
                        </Link>
                        <button
                            className="bg-[#a4a5a8] text-[#1f1f1f] text-sm font-medium py-2 px-6 rounded-3xl hover:bg-[#d7d8d8] transition-colors"
                            onClick={CreateAccount}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}