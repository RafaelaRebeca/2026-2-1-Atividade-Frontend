import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Rafaela Rebeca</h1>
      <p className="mt-4 text-lg text-gray-700">
        Bem-vinda à minha aplicação Next.js!
      </p>
      <Link
        href="/auth"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Ir para Login
      </Link>
    </main>
  );
}
