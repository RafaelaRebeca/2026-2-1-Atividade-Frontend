"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Importado para um redirecionamento SPA mais eficiente

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Inicialização do roteador do Next.js

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // Alterado de "/api/login" para o endpoint real do DummyJSON
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Salvar token em cookie
        Cookies.set("token", data.accessToken, { expires: 7 });

        // Salvar dados do usuário em cookie
        Cookies.set("user", JSON.stringify(data), { expires: 7 });

        // Redirecionar para o dashboard usando o roteador do Next.js
        router.push("/dashboard");
      } else {
        // Captura a mensagem exata de erro retornada pela API do DummyJSON
        setError(data.message || "Usuário ou senha incorretos");
      }
    } catch (err) {
      console.error(err);
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
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}