const thots = [
    "krypto_nat",
    "faith",
    "alice_marrs",
    "amouranth",
    "gloriamatvien",
    "stream_sniperka",
    "pinkfloweremoji",
    "loreliamia",
    "firedancer",
    "lina_asmr",
    "for_line"
];
const container = document.getElementsByTagName("body").item(0);
function begon(container) {
    var _a;
    const elements = container.getElementsByClassName("tw-link");
    for (let i = 0; i < elements.length; i++) {
        const anchor = elements.item(i);
        const channel = (_a = anchor.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace('/', '');
        if (thots.includes(channel)) {
            let current = anchor;
            while (current.isConnected) {
                current = current.parentElement;
                if (current.parentElement === container) {
                    current.remove();
                }
            }
        }
    }
}
function register() {
    const left = document.getElementsByClassName("tw-transition-group");
    const towers = document.getElementsByClassName("tw-tower");
    const containers = [];
    for (let i = 0; i < left.length; i++) {
        containers.push(left.item(i));
    }
    for (let i = 0; i < towers.length; i++) {
        containers.push(towers.item(i));
    }
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        begon(container);
        const collectionObserver = new MutationObserver(() => begon(container));
        collectionObserver.observe(container, { attributes: false, childList: true, subtree: true });
    }
}
register();
const bodyObserver = new MutationObserver(register);
bodyObserver.observe(container, { attributes: false, childList: true, subtree: true });
//# sourceMappingURL=begon.js.map