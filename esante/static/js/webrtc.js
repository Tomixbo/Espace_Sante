// webrtc.js

let localStream;
let peerConnection;
let pendingCandidates = [];
let pendingSignalingMessages = [];
let micEnabled = true; // Keeps track of the microphone state
let videoEnabled = true; // Video state
let peerConnectionReady = false; // Indique si peerConnection est initialisé
const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// Démarrer l'appel lorsque la page est chargée
window.onload = function () {
  startCall();
};

// Configuration du WebSocket
const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const websocket = new WebSocket(
  `${protocol}://${window.location.hostname}:8000/ws/call/${window.member_id}/`
);

websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Message reçu via WebSocket :", data);

  if (peerConnectionReady) {
    handleSignalingMessage(data);
  } else {
    // Mettre en tampon le message jusqu'à ce que peerConnection soit prêt
    console.log(
      "Mise en tampon du message de signalisation jusqu'à ce que peerConnection soit prêt :",
      data
    );
    pendingSignalingMessages.push(data);
  }
};

websocket.onopen = () => {
  console.log("WebSocket connecté");
};

websocket.onerror = (error) => {
  console.error("Erreur WebSocket :", error);
};

websocket.onclose = () => {
  console.log("WebSocket fermé");
};

// Toggle microphone on/off
function toggleMicrophone() {
  if (localStream) {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    // Update the micEnabled state
    micEnabled = !micEnabled;

    // Change the icon based on the mic state
    const micIcon = document.getElementById("micIcon");
    if (micEnabled) {
      micIcon.classList.remove("fa-microphone-slash");
      micIcon.classList.add("fa-microphone");
    } else {
      micIcon.classList.remove("fa-microphone");
      micIcon.classList.add("fa-microphone-slash");
    }
  }
}

// Toggle video on/off
function toggleVideo() {
  if (localStream) {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    videoEnabled = !videoEnabled;

    const videoIcon = document.getElementById("videoIcon");
    if (videoEnabled) {
      videoIcon.classList.remove("fa-video-slash");
      videoIcon.classList.add("fa-video");
    } else {
      videoIcon.classList.remove("fa-video");
      videoIcon.classList.add("fa-video-slash");
    }
  }
}

// Envoyer des messages via WebSocket
function sendMessage(message) {
  if (websocket.readyState === WebSocket.OPEN) {
    console.log("Envoi du message :", message);
    websocket.send(JSON.stringify(message));
  } else {
    console.error(
      "Le WebSocket n'est pas ouvert. Impossible d'envoyer le message :",
      message
    );
  }
}

// Hang up the call and notify the other participant
function hangUpCall() {
  if (peerConnection) {
    peerConnection.close(); // Close the peer connection
    peerConnection = null;
  }

  // Stop all local media tracks
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }

  // Send the hangup signal before closing WebSocket
  sendMessage({ type: "hangup" });

  // Notify the user that the call has ended
  console.log("Call has ended. Redirecting to call-ended page...");
  window.location.href = "/call-ended/";
}

async function startCall() {
  try {
    // Obtenir le flux média local
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    document.getElementById("localVideo").srcObject = localStream;

    // Créer un nouveau RTCPeerConnection
    peerConnection = new RTCPeerConnection(servers);

    // Ajouter les pistes locales à la connexion peer
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Gérer les candidats ICE
    peerConnection.onicecandidate = function (event) {
      if (event.candidate) {
        sendMessage({ type: "new-ice-candidate", candidate: event.candidate });
      }
    };

    // Gérer le flux distant entrant
    peerConnection.ontrack = (event) => {
      console.log("Piste distante reçue :", event);
      const remoteStream = event.streams[0];
      const remoteVideoElement = document.getElementById("remoteVideo");

      if (remoteVideoElement.srcObject !== remoteStream) {
        remoteVideoElement.srcObject = remoteStream;
      }
    };

    // Maintenant peerConnection est prêt
    peerConnectionReady = true;

    // Traiter tous les messages de signalisation mis en tampon
    while (pendingSignalingMessages.length > 0) {
      const message = pendingSignalingMessages.shift();
      handleSignalingMessage(message);
    }

    // Seul l'initiateur crée l'offre après qu'un participant a rejoint
    if (window.isInitiator) {
      console.log("En attente qu'un participant rejoigne...");
    } else {
      console.log("En attente de l'offre de l'initiateur");
    }
  } catch (error) {
    console.error("Erreur lors du démarrage de l'appel :", error);
  }
}

// Créer et envoyer une offre
async function createOffer() {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("Offre créée :", offer);
  sendMessage({ type: "offer", sdp: peerConnection.localDescription });
}

// Handle WebSocket signaling messages
function handleSignalingMessage(parsedMessage) {
  console.log("Handling signaling message:", parsedMessage);

  if (parsedMessage.type === "offer") {
    handleOffer(parsedMessage.sdp);
  } else if (parsedMessage.type === "answer") {
    handleAnswer(parsedMessage.sdp);
  } else if (parsedMessage.type === "new-ice-candidate") {
    handleICECandidateMessage(parsedMessage.candidate);
  } else if (parsedMessage.type === "hangup") {
    // If the other user hangs up, end the call and redirect
    console.log("Received hangup signal, triggering hangUpCall()");
    hangUpCall(); // End the call on receiving a hangup signal
  } else if (parsedMessage.type === "new-user-joined") {
    if (window.isInitiator) {
      createOffer(); // Send an offer when a new user joins
    }
  } else if (parsedMessage.type === "user_disconnected") {
    console.log("The other user was disconnected due to timeout.");
    hangUpCall(); // End the call on timeout
  }
}

// Gérer l'offre reçue et créer une réponse
async function handleOffer(offer) {
  console.log("Offre reçue :", offer);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  // Traiter les candidats ICE reçus avant que la description distante soit définie
  for (let i = 0; i < pendingCandidates.length; i++) {
    await peerConnection.addIceCandidate(
      new RTCIceCandidate(pendingCandidates[i])
    );
  }
  pendingCandidates = [];

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  console.log("Réponse créée :", answer);
  sendMessage({ type: "answer", sdp: peerConnection.localDescription });
}

// Gérer la réponse reçue
async function handleAnswer(answer) {
  console.log("Réponse reçue :", answer);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

  // Traiter les candidats ICE reçus avant que la description distante soit définie
  for (let i = 0; i < pendingCandidates.length; i++) {
    await peerConnection.addIceCandidate(
      new RTCIceCandidate(pendingCandidates[i])
    );
  }
  pendingCandidates = [];
}

// Gérer les candidats ICE entrants
async function handleICECandidateMessage(candidate) {
  try {
    if (!peerConnection) {
      // Mettre en tampon le candidat jusqu'à ce que peerConnection soit initialisé
      console.log(
        "Mise en tampon du candidat ICE jusqu'à ce que peerConnection soit initialisé :",
        candidate
      );
      pendingCandidates.push(candidate);
      return;
    }

    if (
      peerConnection.remoteDescription &&
      peerConnection.remoteDescription.type
    ) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
      // Mettre en tampon le candidat jusqu'à ce que la description distante soit définie
      console.log(
        "Mise en tampon du candidat ICE jusqu'à ce que la description distante soit définie :",
        candidate
      );
      pendingCandidates.push(candidate);
    }
  } catch (e) {
    console.error("Erreur lors de l'ajout du candidat ICE reçu", e);
  }
}

// Start the heartbeat mechanism
function startHeartbeat() {
  setInterval(() => {
    sendMessage({ type: "heartbeat" });
    console.log("Sending heartbeat to server...");
  }, 5000); // Send a heartbeat every 5 seconds
}

// Send heartbeat as soon as the connection opens
websocket.onopen = () => {
  console.log("WebSocket connected");
  startHeartbeat(); // Start the heartbeat mechanism
};
