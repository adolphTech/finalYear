//-----------------------------------------------------------------//

const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");
const leaveButton = document.getElementById("leave-room-button");
const muteButton = document.getElementById("mute-button");

const cont = document.getElementById("lobby-container");

// const buttonsContainer = document.getElementById('buttons-container');

// Hide the buttons by default
// buttonsContainer.style.display = 'none';

const microphoneIcon = muteButton.querySelector("i");

let room;

const startRoom = async(event) => {
    // prevent a page reload when a user submits the form
    event.preventDefault();
    // hide the join form
    // form.style.visibility = "hidden";
    form.style.display = "none";
    cont.style.display = "none";



    // retrieve the room name
    const roomName = roomNameInput.value;

    // fetch an Access Token from the join-room route
    const response = await fetch("/meeting", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName: roomName }),
    });
    const { token } = await response.json();

    // join the video room with the token
    room = await joinVideoRoom(roomName, token);

    // render the local and remote participants' video and audio tracks
    handleConnectedParticipant(room.localParticipant);
    room.participants.forEach(handleConnectedParticipant);
    room.on("participantConnected", handleConnectedParticipant);

    // handle cleanup when a participant disconnects
    room.on("participantDisconnected", handleDisconnectedParticipant);

    window.addEventListener("pagehide", () => room.disconnect());
    window.addEventListener("beforeunload", () => room.disconnect());

    const buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.style.visibility = "visible";
};



const handleConnectedParticipant = (participant) => {
    // create a div for this participant's tracks
    const participantDiv = document.createElement("div");
    participantDiv.setAttribute("id", participant.identity);
    participantDiv.style.display = "inline-block"; // make the participant div inline

    container.appendChild(participantDiv);

    // iterate through the participant's published tracks and
    // call `handleTrackPublication` on them
    participant.tracks.forEach((trackPublication) => {
        handleTrackPublication(trackPublication, participant, participantDiv);
    });

    // listen for any new track publications
    participant.on("trackPublished", (trackPublication) => {
        handleTrackPublication(trackPublication, participant, participantDiv);
    });
};

const handleTrackPublication = (
    trackPublication,
    participant,
    participantDiv
) => {
    function displayTrack(track) {
        // append this track to the participant's div and render it on the page
        // set the video dimensions to 200x200 pixels
        const trackElement = track.attach();
        trackElement.style.width = "400px";
        trackElement.style.height = "400px";
        participantDiv.appendChild(trackElement);
    }

    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
        displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on("subscribed", displayTrack);
};

const handleDisconnectedParticipant = (participant) => {
    // stop listening for this participant
    participant.removeAllListeners();
    // remove this participant's div from the page
    const participantDiv = document.getElementById(participant.identity);
    participantDiv.remove();
};

const joinVideoRoom = async(roomName, token) => {
    // join the video room with the Access Token and the given room name
    const room = await Twilio.Video.connect(token, {
        room: roomName,
    });
    return room;
};

const disconnectFromRoom = () => {
    if (room) {
        room.disconnect();
    }
};

let isMuted = true;

muteButton.addEventListener("click", () => {
    isMuted = !isMuted;

    if (isMuted) {
        // mute
        microphoneIcon.classList.remove("unmuted");
        microphoneIcon.classList.add("muted");

        // code to mute the audio
        const localParticipant = room.localParticipant;
        localParticipant.audioTracks.forEach((audioTrack) => {
            if (audioTrack.track.isEnabled) {
                audioTrack.track.disable();
            }
        });

        // update button icon
        muteButton.innerHTML = `<span style='font-size: 1.9em; color: White;'>
      <i class='fa-solid fa-microphone-slash'></i>
    </span>`;
    } else {
        // unmute
        microphoneIcon.classList.remove("muted");
        microphoneIcon.classList.add("unmuted");

        // code to unmute the audio
        const localParticipant = room.localParticipant;
        localParticipant.audioTracks.forEach((audioTrack) => {
            if (!audioTrack.track.isEnabled) {
                audioTrack.track.enable();
            }
        });

        // update button icon
        muteButton.innerHTML = `<span style='font-size: 1.9em; color: Dodgerblue;'>
      <i class='fa-solid fa-microphone'></i>
    </span>`;
    }
});

leaveButton.addEventListener("click", () => {
    disconnectFromRoom();
    window.location.href = "/meeting"; // replace with the URL of the page to redirect to
});

form.addEventListener("submit", startRoom);