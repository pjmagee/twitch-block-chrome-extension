function saveOptions(): void {

    const element = document.getElementById('streamers') as HTMLTextAreaElement;

    chrome.storage.local.set({
        streamers: element.value,
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 750);
    });
}

function restoreOptions(): void {
    chrome.storage.local.get({
        streamers: '',
    }, (items) => {
        const element = document.getElementById('streamers') as HTMLTextAreaElement;
        element.value = items.streamers;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);