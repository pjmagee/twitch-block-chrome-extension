function saveOptions() {
    const element = document.getElementById('streamers');
    chrome.storage.local.set({
        streamers: element.value,
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 750);
    });
}
function restoreOptions() {
    chrome.storage.local.get({
        streamers: '',
    }, (items) => {
        const element = document.getElementById('streamers');
        element.value = items.streamers;
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
