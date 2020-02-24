import fs from "fs";
import path from "path";

let cached = null;

export default async () => {

    if(cached) {
        return JSON.parse(JSON.stringify(cached));
    }

    let list = [
        "inbound-direct-to-user-number",
        "outbound-ring-out-direct",
        "internal-call-queue",
        "tick-tock",
        "rob-board-room",
        "dnd-internal",
        "left-voicemail",
        "inbound-to-voicemail",
        "inbound-call-to-main-number",
        "outbound-ring-out-press-one",
        "inbound-main-number-hangup",
        "gone-event-transfer"
    ];

    return Promise.all(
        list.map(fileName => new Promise((resolve, reject) => {

            fs.readFile(path.resolve(__dirname, fileName + ".txt"), "utf8", (err, data) => {
                if(err) {
                    return reject({
                        fileName,
                        err
                    });
                }

                return resolve({
                    fileName,
                    data: data.split("\n").filter(event => event).map(event => {
                        const e = JSON.parse(event);
                        return e.body || e;
                    })
                });
            });
        }))
    )
        .then(examples =>
            examples.reduce((object, example) => {
                object[example.fileName] = example.data;

                return object;
            }, {})
        )
        .then(examples => {
            cached = examples;
            return JSON.parse(JSON.stringify(cached));
        });

};
