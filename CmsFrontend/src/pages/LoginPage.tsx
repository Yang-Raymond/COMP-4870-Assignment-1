import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authenticationApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  //Checks if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      await login(email, password); // auth API stores authToken
      navigate("/");
    } catch (e) {
      console.error(e);
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="card w-full max-w-4xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left */}
          <div className="p-10">
            <h1 className="text-4xl font-extrabold tracking-tight">Mini-CMS</h1>
            <h2 className="mt-3 text-3xl font-semibold">Sign in</h2>
            <p className="mt-2 text-(--muted)">to continue to Mini-CMS</p>

            {errorMsg && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="p-10 border-t md:border-t-0 md:border-l border-(--border)">
            <form className="space-y-4" onSubmit={onLogin}>
              <input
                type="email"
                className="input focus-ring"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input focus-ring"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mt-8 flex items-center justify-between">
                <Link to="/signup" className="link text-sm font-semibold">
                  Create account
                </Link>
                <input
                  type="submit"
                  value="Sign in"
                  className="btn-primary-sm"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
