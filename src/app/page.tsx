"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import socket from "../lib/socket";

export default function Home() {
  const [name, setName] = useState("");
  const [alignment, setAlignment] = useState<"left" | "right" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [queueStatus, setQueueStatus] = useState<string>("");
  const router = useRouter();

  // Monitorar conexão
  useEffect(() => {
    // Evento de conexão
    socket.on("connect", () => {
      console.log("Conectado ao servidor!");
      setIsConnected(true);
    });

    // Evento de desconexão
    socket.on("disconnect", () => {
      console.log("Desconectado do servidor");
      setIsConnected(false);
    });

    // Evento de match
    socket.on("match", (data) => {
      console.log("Match encontrado!", data);
      // Armazenar informações do oponente
      if (typeof window !== "undefined") {
        localStorage.setItem("opponent", JSON.stringify(data.opponent));
      }
      router.push("/debate");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("match");
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !alignment) return;

    setIsLoading(true);
    setQueueStatus("Entrando na fila...");

    // Entrar na fila
    socket.emit("joinQueue", {
      name,
      alignment,
    });

    // Redirecionar para sala de espera
    router.push("/waiting");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Polarize Debate</h1>

        {/* Indicador de conexão */}
        <div className={`mb-4 text-center ${isConnected ? "text-green-500" : "text-red-500"}`}>
          {isConnected ? "Conectado" : "Desconectado"}
        </div>

        {/* Status da fila */}
        {queueStatus && <div className="mb-4 text-center text-blue-600">{queueStatus}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seu Alinhamento Político</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAlignment("left")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  alignment === "left" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-300"
                }`}
              >
                <span className="text-lg font-medium text-red-600">Esquerda</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("right")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  alignment === "right" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <span className="text-lg font-medium text-blue-600">Direita</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!name || !alignment || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Conectando..." : "Iniciar Debate"}
          </button>
        </form>
      </div>
    </main>
  );
}
