let thots: string[] = [];

const url = 'https://raw.githubusercontent.com/pjmagee/thot-blocker-chrome-extension/master/ThotBlock.ChromeExtension/streamers.json';

chrome.storage.local.get({ thots: [] }, (items: { thots: string[] }) => {

    if (items.thots.length === 0) {
        fetch(url).then(response => response.text()).then(json => {
            thots = JSON.parse(json);
            chrome.storage.local.set({ thots: thots });
        });
    }
    else {
        thots = items.thots;
    }
});

const container: Element = document.getElementsByTagName("body").item(0);

function begon(container: Element): void {

    const elements: HTMLCollectionOf<Element> = container.getElementsByClassName("tw-link");

    for (let i = 0; i < elements.length; i++) {

        const anchor = elements.item(i) as HTMLAnchorElement;
        const channel = anchor.getAttribute('href')?.replace('/', '');

        if (thots.includes(channel)) {

            let current: HTMLElement = anchor;
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

function register(): void {

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