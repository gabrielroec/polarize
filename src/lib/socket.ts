// src/lib/socket.ts
import { io } from "socket.io-client";

// Criar conexão com o servidor
const socket = io("http://localhost:3001");

export default socket;
