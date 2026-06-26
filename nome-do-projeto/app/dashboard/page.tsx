"use client";
import { useEffect, useState } from "react";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    async function carregarQuotes() {
      const resposta = await fetch("https://dummyjson.com/quotes");
      const dados = await resposta.json();
      setQuotes(dados.quotes);
    }

    carregarQuotes();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      // Editar
      setQuotes(
        quotes.map((q) =>
          q.id === editingId ? { ...q, quote, author } : q
        )
      );
      setEditingId(null);
    } else {
      // Criar
      const novaQuote: Quote = {
        id: quotes.length + 1,
        quote,
        author,
      };
      setQuotes([...quotes, novaQuote]);
    }

    setQuote("");
    setAuthor("");
  }

  function handleEdit(id: number) {
    const q = quotes.find((q) => q.id === id);
    if (q) {
      setQuote(q.quote);
      setAuthor(q.author);
      setEditingId(id);
    }
  }

  function handleDelete(id: number) {
    setQuotes(quotes.filter((q) => q.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Dashboard</h1>

      {/* Formulário de criação/edição */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-4 bg-white p-6 rounded shadow-md w-96 mx-auto"
      >
        <input
          type="text"
          placeholder="Citação"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          {editingId ? "Salvar edição" : "Adicionar citação"}
        </button>
      </form>

      {/* Lista de citações */}
      <div className="grid gap-6">
        {quotes.map((quote) => (
          <div key={quote.id} className="rounded-lg bg-white p-5 shadow">
            <p className="text-lg italic">"{quote.quote}"</p>
            <p className="mt-4 font-semibold text-right">— {quote.author}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(quote.id)}
                className="rounded bg-blue-600 px-3 py-1 text-white"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(quote.id)}
                className="rounded bg-red-600 px-3 py-1 text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
