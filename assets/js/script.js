Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const initDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()

    let deviceMap = {}

    devices.forEach((device, _) => {
        if (device.kind.includes("input")) {
            let key = device.kind.includes('audio') ? 'audio' : 'video'
            if (device.groupId in deviceMap) {
                deviceMap[device.groupId] = {
                    ...deviceMap[device.groupId],
                    [key]: device
                }
            } else {
                deviceMap[device.groupId] = {
                    [key]: device
                }
            }
        }
    })

    const sourceSelect = document.querySelector("#source")

    for (const groupId in deviceMap) {
        const constraints = deviceMap[groupId]

        let label = ""
        let idx = 0
        for (const constraint in constraints) {
            const settings = constraints[constraint]

            label += `${idx++ == 0 ? '' : ' + '}(${constraint.capitalize()}) ${settings.label}`
        }

        sourceSelect.append(new DOMParser().parseFromString(`<option value='${JSON.stringify(constraints)}'>${label}</option>`, "text/html").firstChild.firstChild.nextSibling.firstChild)
    }

    console.log(deviceMap)
}

(function () {
    "use strict";

    initDevices()

    document.querySelector("#button").addEventListener('click', async () => {
        const sourceSelect = document.querySelector("#source")
        let constraints = sourceSelect.value
        console.log(constraints)
        if (constraints != "") {
            constraints = JSON.parse(constraints)
            if ('video' in constraints) {
                constraints['video'] = {
                    ...constraints['video'],
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
            }

            if ('audio' in constraints) {
                constraints['audio'] = {
                    ...constraints['audio'],
                    echoCancellation: false
                }
            }
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(await navigator.mediaDevices.enumerateDevices())
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        }
    })

})();