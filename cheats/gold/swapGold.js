/**
* @license StewartPrivateLicense-2.0.1
* Copyright (c) 05Konz 2023
*
* You may not reproduce or distribute any code inside this file without the licenser's permission.
* You may not copy, modify, steal, skid, or recreate any of the code inside this file.
* You may not under any circumstance republish any code from this file as your own.
* 
* ALL TERMS STATED IN THE LINK BELOW APPLY ASWELL
* https://github.com/05Konz/Blooket-Cheats/blob/main/LICENSE
*/

/* THE UPDATE CHECKER IS ADDED DURING COMMIT PREP, THERE MAY BE REDUNDANT CODE, DO NOT TOUCH */

(() => {
    const cheat = (async () => {
        let { stateNode } = Object.values(document.querySelector('body div[class*="camelCase"]'))[1].children[0]._owner;
        stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
            stateNode.setState({
                players: (players ? Object.entries(players).map(([name, { b, g }]) => ({
                    name, blook: b, gold: g || 0
                })).filter((e) => e.name != stateNode.props.client.name).sort(({ gold }, { gold: gold2 }) => gold2 - gold) : []),
                ready: true,
                phaseTwo: true,
                stage: "prize",
                choiceObj: { type: "swap" }
            });
        });
    });
    let img = new Image;
    img.src = "https://raw.githubusercontent.com/05Konz/Blooket-Cheats/main/autoupdate/timestamps/gold/swapGold.png?" + Date.now();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);
        let { data } = ctx.getImageData(0, 0, this.width, this.height), decode = "", last;
        for (let i = 0; i < data.length; i += 4) {
            let char = String.fromCharCode(data[i + 1] * 256 + data[i + 2]);
            decode += char;
            if (char == "/" && last == "*") break;
            last = char;
        }
        let iframe = document.querySelector("iframe");
        const [_, time, error] = decode.match(/LastUpdated: (.+?); ErrorMessage: "(.+?)"/);
        if (parseInt(time) <= 1692656146108 || iframe.contentWindow.confirm(error)) cheat();
    }
    img.onerror = img.onabort = () => (img.src = null, cheat());
})();