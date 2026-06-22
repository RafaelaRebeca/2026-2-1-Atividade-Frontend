"use client";
import { useState } from "react";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            password,
        }),
    });


      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Usuário ou senha incorretos");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-white p-6 rounded shadow-md w-80"
      >
        <input
          type="text"
          placeholder="Apelido"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
