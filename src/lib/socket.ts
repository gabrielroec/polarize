// src/lib/socket.ts
import { io } from "socket.io-client";

// Criar conexão com o servidor
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const socket = io(SOCKET_URL);

export default socket;
