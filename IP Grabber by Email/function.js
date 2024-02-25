//we're using WebRTC
function captureAndSendIP() {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = event => {
        if (event.candidate) {
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
            const ipAddr = ipRegex.exec(event.candidate.candidate)[1];
            sendIPToServer(ipAddr);
            pc.close();
        }
    };
    // Create a data
    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(err => console.error(err));
}

// Function to send the IP address to the server
function sendIPToServer(ipAddress) {
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipAddress }),
    })
    .then(response => {
        if (response.ok) {
            console.log("IP address sent to the server successfully.");
        } else {
            console.error("Failed to send the IP address to the server.");
        }
    })
    .catch(error => console.error('Error sending IP address to the server:', error));
}
