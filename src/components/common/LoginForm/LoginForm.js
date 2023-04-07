import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../../ui/Error";
import { useLoginMutation } from "../../../features/auth/authApi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const data = {
      email,
      password,
    };

    login(data);
  };

  useEffect(() => {
    if (isSuccess && data?.user?.role === "student") {
      navigate("/course/1");
    }
    if (isSuccess && data?.user?.role === "admin") {
      navigate("/admin/dashboard");
    }
    if (isError) {
      setError("Failed to Login");
    }
  }, [data, isError, isSuccess, navigate]);

  return (
    <form
      className="mt-8 space-y-6"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="login-input rounded-t-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="login-input rounded-b-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-400 capitalize">Don't have an account?</p>
        <Link
          to="/signup"
          className="font-medium text-violet-600 hover:text-violet-500"
        >
          Create An Account
        </Link>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
      </div>
      {error !== "" && <Error message={error} />}
    </form>
  );
}
