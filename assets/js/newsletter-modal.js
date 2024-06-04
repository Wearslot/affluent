if (!customElements.get('newletter-modal')) {
    customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
        constructor() {
            super();

            this.close = this.querySelector('.news-modal-close');
            this.close.addEventListener("click", this.disablePopup.bind(this));
        }

        disablePopup() {
            localStorage.setItem('disabledPopup', 'yes');
        }
    })
}