const fetch = require("node-fetch")
const clients = [
    ["ANDROID", "19.02.39"]
]

let i = 0;
let x = setInterval(() => {
    console.log("try client", clients[i][0], clients[i][1])
    fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
            "Content-Type": "application/json",
            "x-goog-authuser": "0",
            "x-origin": "https://www.youtube.com/",
            "user-agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip"
        },
        "referrer": "https://www.youtube.com/watch?v=yQwPhCI_qO0",
        "body": JSON.stringify({
            "context": {
            "client": {
                "hl": "en",
                "clientName": clients[i][0],
                "clientVersion": clients[i][1],
                "androidSdkVersion": 34,
                "mainAppWebInfo": {
                    "graftUrl": "/watch?v=yQwPhCI_qO0"
                }
            }
            },
            "videoId": "yQwPhCI_qO0"
        }),
        "method": "POST",
        "mode": "cors"
    }).then(r => {r.json().then(m => {
        console.log(m)
        if(m.streamingData) {
            console.log("^^ streamingData!!")
        } else {
            console.log("^^ no stream links!!")
        }
        //require("fs").writeFileSync(clients[i][0] + ".json", JSON.stringify(m))
        i++
        if(!clients[i]) {
            process.exit()
        }
    })})
}, 1500)