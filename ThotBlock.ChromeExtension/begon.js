const thots = [
    "krypto_nat",
    "faith",
    "alice_marrs",
    "amouranth",
    "gloriamatvien",
    "stream_sniperka",
    "pinkfloweremoji"
];
const tower = document.getElementsByClassName("tw-tower").item(0);
function begon() {
    var _a;
    const elements = document.getElementsByClassName("tw-link");
    for (let i = 0; i < elements.length; i++) {
        const anchor = elements.item(i);
        const channel = (_a = anchor.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace('/', '');
        if (thots.includes(channel)) {
            let current = anchor;
            while (current.isConnected) {
                current = current.parentElement;
                if (current.parentElement === tower) {
                    current.remove();
                }
            }
        }
    }
}
const streamers = new MutationObserver(begon); // subsequent changes to the tower, we want to run the begon function
begon(); // Initial removal
streamers.observe(tower, { attributes: false, childList: true, subtree: true });
//# sourceMappingURL=begon.js.map