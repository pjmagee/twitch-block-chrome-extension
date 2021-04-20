const thots = [
    "krypto_nat",
    "faith",
    "alice_marrs",
    "amouranth",
    "gloriamatvien",
    "stream_sniperka",
    "pinkfloweremoji"
];

const tower: Element = document.getElementsByClassName("tw-tower").item(0);

function begon(): void {

    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("tw-link");

    for (let i = 0; i < elements.length; i++) {

        const anchor = elements.item(i) as HTMLAnchorElement;
        const channel = anchor.getAttribute('href')?.replace('/', '');

        if (thots.includes(channel)) {
            let current: HTMLElement = anchor;
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