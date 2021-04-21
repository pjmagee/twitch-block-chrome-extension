// const url = 'https://raw.githubusercontent.com/pjmagee/thot-blocker-chrome-extension/master/ThotBlock.ChromeExtension/streamers.json';


function begone(streamers: string[], container: Element): void {

    const elements: HTMLCollectionOf<Element> = container.getElementsByClassName("tw-link");

    for (let i = 0; i < elements.length; i++) {

        const anchor = elements.item(i) as HTMLAnchorElement;
        const channel = anchor.getAttribute('href')?.replace('/', '');

        if (streamers.includes(channel)) {

            let current: HTMLElement = anchor;
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

function addToContainers(containers: Element[], elements: HTMLCollectionOf<Element>): void {
    for (let i = 0; i < elements.length; i++) {
        containers.push(elements.item(i));
    }
}

function register(streamers: string[]): void {

    const suggested: HTMLCollectionOf<Element> = document.getElementsByClassName("tw-transition-group");
    const cards: HTMLCollectionOf<Element> = document.getElementsByClassName("tw-tower");
    const containers: Element[] = [];

    addToContainers(containers, suggested);
    addToContainers(containers, cards);

    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        begone(streamers, container);
        const collectionObserver = new MutationObserver(() => begone(streamers, container));
        collectionObserver.observe(container, { attributes: false, childList: true, subtree: true });
    }
}


function initialize(value: string): void {

    chrome.storage.local.get({ streamers: value }, (result: { streamers: string }) => {

        const streamers = result.streamers.split('\n').map((value: string, index: number) => value.trim().toLowerCase());
        const container: Element = document.getElementsByTagName("body").item(0);

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