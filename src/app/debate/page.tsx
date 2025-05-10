"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DebatePage() {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Aqui posteriormente adicionaremos a lógica de WebRTC
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Erro ao acessar câmera/microfone:", err);
        });
    }

    return () => {
      // Limpar streams ao sair
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleLeave = () => {
    setIsLeaving(true);
    // Aqui posteriormente adicionaremos a lógica de desconexão
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          {/* Vídeo Local */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 text-sm">Você</div>
          </div>

          {/* Vídeo Remoto */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-sm">Oponente</div>
          </div>
        </div>

        {/* Controles */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-3 rounded-full ${isVideoEnabled ? "bg-blue-600" : "bg-red-600"}`}
            >
              {isVideoEnabled ? "📹" : "🚫"}
            </button>

            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-3 rounded-full ${isAudioEnabled ? "bg-blue-600" : "bg-red-600"}`}
            >
              {isAudioEnabled ? "🎤" : "🔇"}
            </button>

            <button onClick={handleLeave} disabled={isLeaving} className="p-3 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50">
              {isLeaving ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
