"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "../../lib/socket";
import React from "react";

export default function Waiting() {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar conexão
    setIsConnected(socket.connected);

    // Evento de conexão
    socket.on("connect", () => {
      setIsConnected(true);
    });

    // Evento de desconexão
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Evento de match
    socket.on("match", (data) => {
      console.log("Match encontrado!", data);
      localStorage.setItem("opponent", JSON.stringify(data.opponent));
      router.push("/debate");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("match");
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Aguardando Debate</h1>

        {/* Indicador de conexão */}
        <div className={`mb-4 ${isConnected ? "text-green-500" : "text-red-500"}`}>{isConnected ? "Conectado" : "Desconectado"}</div>

        {/* Animação de loading */}
        <div className="flex justify-center mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <p className="text-gray-600">Procurando alguém com visão política oposta...</p>
      </div>
    </main>
  );
}
