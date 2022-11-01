Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const initDevices = async () => {
    try {
        await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    } catch (error) {
        alert("Please grant access to Microphone and Camera")
    }
    const devices = await navigator.mediaDevices.enumerateDevices()

    let audioDevices = []
    let videoDevices = []

    devices.forEach((device, _) => {
        if (device.kind.includes("input")) {
            if (device.kind.includes('audio')) {
                audioDevices = [
                    ...audioDevices,
                    device
                ]
            } else {
                videoDevices = [
                    ...videoDevices,
                    device
                ]
            }
        }
    })

    const videoSource = document.querySelector("#video-source")
    const audioSource = document.querySelector("#audio-source")

    videoDevices.forEach(constraint => {
        videoSource.append(new DOMParser().parseFromString(`<option value='${JSON.stringify(constraint)}'>${constraint.label}</option>`, "text/html").firstChild.firstChild.nextSibling.firstChild)
    })
    audioDevices.forEach(constraint => {
        audioSource.append(new DOMParser().parseFromString(`<option value='${JSON.stringify(constraint)}'>${constraint.label}</option>`, "text/html").firstChild.firstChild.nextSibling.firstChild)
    })

    console.log(videoDevices, audioDevices)
}

(function () {
    "use strict";

    initDevices()

    document.querySelector("#button").addEventListener('click', async () => {
        const videoSource = document.querySelector("#video-source")
        const audioSource = document.querySelector("#audio-source")
        let videoConstraint = videoSource.value
        let audioConstraint = audioSource.value
        console.log(videoConstraint, audioConstraint)
        if (videoConstraint != "" && audioConstraint != "") {
            videoConstraint = JSON.parse(videoConstraint)
            audioConstraint = JSON.parse(audioConstraint)
            videoConstraint = {
                ...videoConstraint,
                width: {
                    min: 1280,
                    ideal: 1280,
                    max: 1920,
                },
                height: {
                    min: 720,
                    ideal: 720,
                    max: 1080
                },
                frameRate: 59.94
            }
            
            audioConstraint = {
                ...audioConstraint,
                echoCancellation: false
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: videoConstraint,
                audio: audioConstraint
            });
            console.log(await navigator.mediaDevices.enumerateDevices())
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        }
    })

})();