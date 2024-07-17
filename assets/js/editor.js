window.addEventListener("message", (e) => {
    const data = e.data;

    if(data.action === 'taojaa:section:select') {
        
    }

    const event = new Event(data.action, { bubbles: true });
    document.dispatchEvent(event);
})

// Listen for the custom event dispatched by the editor
document.addEventListener('taojaa:section:select', (event) => {

});


document.addEventListener('taojaa:section:disable-inspector', () => {
    document.querySelectorAll('.taojaa-editor-wrapper').forEach((e) => {
        e.classList.add('no-inspector')
    });
});

document.addEventListener('taojaa:section:enable-inspector', () => {
    document.querySelectorAll('.taojaa-editor-wrapper').forEach((e) => {
        e.classList.remove('no-inspector')
    });
});