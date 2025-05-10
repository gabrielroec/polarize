"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function WaitingPage() {
  const [dots, setDots] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Simulando um match após 5 segundos (apenas para teste)
    const matchTimeout = setTimeout(() => {
      router.push("/debate");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(matchTimeout);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Procurando um debate{dots}</h2>

        <p className="text-gray-600 mb-6">Aguarde enquanto encontramos alguém com visões políticas diferentes para debater</p>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Conectado à rede</span>
          </div>

          <button onClick={() => router.push("/")} className="text-blue-600 hover:text-blue-800 font-medium">
            Cancelar busca
          </button>
        </div>
      </div>
    </main>
  );
}
