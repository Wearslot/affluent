if (!customElements.get('newletter-modal')) {
    customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
        constructor() {
            super();

            this.close = this.querySelector('.news-modal-close');
            this.close.addEventListener("click", this.disablePopup.bind(this));

            this.loader = this.querySelector('#spinloader');

            this.email = this.querySelector('#email');

            this.signUp = this.querySelector('#signupButton');
            this.signUp.addEventListener("click", this.onSubmit.bind(this))
        }

        disablePopup() {
            localStorage.setItem('disabledPopup', 'yes');
            setTimeout(() => {
                localStorage.removeItem('disabledPopup');
            }, 90000)
        }

        onSubmit(event) {
            event.preventDefault();
            this.loader.classList.remove("hidden")
            if ( this.email.value !== "") {
                const config = fetchConfig();
                config.body = JSON.stringify({email: this.email.value})
                console.log(config.body)
                fetch(`${routes.newsletter_signup}`, config)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
        }
    })
}