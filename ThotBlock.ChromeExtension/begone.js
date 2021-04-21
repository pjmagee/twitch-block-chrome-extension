const url = 'https://raw.githubusercontent.com/pjmagee/thot-blocker-chrome-extension/master/ThotBlock.ChromeExtension/streamers.json';
function begone(data, container) {
    var _a;
    const elements = container.getElementsByClassName("tw-link");
    for (let i = 0; i < elements.length; i++) {
        const anchor = elements.item(i);
        const channel = (_a = anchor.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace('/', '');
        if (data.streamers.includes(channel)) {
            let current = anchor;
            while (current.isConnected) {
                current = current.parentElement;
                if (current.parentElement === container) {
                    console.log("removing streamer.");
                    current.remove();
                }
            }
        }
    }
}
function register(data) {
    const suggested = document.getElementsByClassName("tw-transition-group");
    const cards = document.getElementsByClassName("tw-tower");
    const containers = [];
    for (let i = 0; i < suggested.length; i++) {
        containers.push(suggested.item(i));
    }
    for (let i = 0; i < cards.length; i++) {
        containers.push(cards.item(i));
    }
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        begone(data, container);
        const collectionObserver = new MutationObserver(() => begone(data, container));
        collectionObserver.observe(container, { attributes: false, childList: true, subtree: true });
    }
}
function initialize() {
    let data = {
        streamers: [],
        expires: null
    };
    chrome.storage.local.get(data, (result) => {
        const now = new Date();
        if (result.streamers.length === 0 || result.expires === null || result.expires < now.getDate()) {
            fetch(url).then(response => response.text()).then(json => {
                const tomorrow = new Date();
                tomorrow.setDate(now.getDate() + 1);
                data.expires = tomorrow.getDate();
                data.streamers = JSON.parse(json);
                chrome.storage.local.set(data);
            });
        }
        else {
            data = result;
        }
    });
    const container = document.getElementsByTagName("body").item(0);
    register(data);
    const bodyObserver = new MutationObserver(() => register(data));
    bodyObserver.observe(container, { attributes: false, childList: true, subtree: true });
}
initialize();
