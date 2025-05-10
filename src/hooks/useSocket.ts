// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Conectar ao servidor
    const newSocket = io("http://localhost:3001");

    // Evento de conexão
    newSocket.on("connect", () => {
      console.log("Conectado ao servidor!");
    });

    // Evento de desconexão
    newSocket.on("disconnect", () => {
      console.log("Desconectado do servidor");
    });

    setSocket(newSocket);

    // Limpar conexão quando o componente for desmontado
    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
}
