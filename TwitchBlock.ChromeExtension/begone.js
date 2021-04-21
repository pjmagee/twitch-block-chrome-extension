// const url = 'https://raw.githubusercontent.com/pjmagee/thot-blocker-chrome-extension/master/ThotBlock.ChromeExtension/streamers.json';
function begone(streamers, container) {
    var _a;
    const elements = container.getElementsByClassName("tw-link");
    for (let i = 0; i < elements.length; i++) {
        const anchor = elements.item(i);
        const channel = (_a = anchor.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace('/', '');
        if (streamers.includes(channel)) {
            let current = anchor;
            while (current.isConnected) {
                current = current.parentElement;
                if (current.parentElement === container) {
                    console.log("removing: " + channel);
                    current.remove();
                    break;
                }
            }
        }
    }
}
function addToContainers(containers, elements) {
    for (let i = 0; i < elements.length; i++) {
        containers.push(elements.item(i));
    }
}
function register(streamers) {
    const suggested = document.getElementsByClassName("tw-transition-group");
    const cards = document.getElementsByClassName("tw-tower");
    const containers = [];
    addToContainers(containers, suggested);
    addToContainers(containers, cards);
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        begone(streamers, container);
        const collectionObserver = new MutationObserver(() => begone(streamers, container));
        collectionObserver.observe(container, { attributes: false, childList: true, subtree: true });
    }
}
function initialize(value) {
    chrome.storage.local.get({ streamers: value }, (result) => {
        const streamers = result.streamers.split('\n').map((value, index) => value.trim().toLowerCase());
        const container = document.getElementsByTagName("body").item(0);
        console.log('streamers...', streamers);
        register(streamers);
        const bodyObserver = new MutationObserver(() => register(streamers));
        bodyObserver.observe(container, { attributes: false, childList: true, subtree: true });
    });
}
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes["streamers"].newValue && namespace === 'local') {
        console.log('storage changed, reloading...');
        initialize(changes["streamers"].newValue);
    }
});
initialize('');
