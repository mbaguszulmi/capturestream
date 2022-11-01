(function () {
    "use strict";

    document.querySelector("#button").addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
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
            }, audio: {
                deviceId: "bf6b78561019002f6dd9f364d1e564bc961c0c6929c1d8fd8c3f6dfb55a9c93b",
                echoCancellation: false
            }
        });
        console.log("ok")
        console.log(await navigator.mediaDevices.enumerateDevices())
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();

        // const audioStream = await navigator.mediaDevices.getUserMedia({
        //     video: false,
        //     audio: {
        //         deviceId: "bf6b78561019002f6dd9f364d1e564bc961c0c6929c1d8fd8c3f6dfb55a9c93b",
        //     }
        // })
        // const audio = new Audio()
        // audio.srcObject = audioStream
        // audio.play()
    })

})();