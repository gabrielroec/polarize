// Configuração dos servidores STUN/TURN
export const iceServers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};

// Função auxiliar para criar uma nova conexão peer
export const createPeerConnection = () => {
  return new RTCPeerConnection(iceServers);
};
