if (!customElements.get('newletter-modal')) {
    customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
        constructor() {
            super();

            this.close = this.querySelector('.news-modal-close');
            this.close.addEventListener("click", this.disablePopup.bind(this));

            this.feedback = this.querySelector('#email_feedback');

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
            this.signUp.disabled = true
            if ( this.email.value !== "") {
                this.feedback.innerText= "Loading....";
                const config = fetchConfig();
                config.body = JSON.stringify({email: this.email.value})
                console.log(config.body)
                fetch(`${routes.newsletter_signup}`, config)
                .then(response => response.json())
                .then(data => {
                    this.feedback.innerText= data.message;
                })
                .catch(e => {
                    console.log(e);
                });
            }
            else {
                this.feedback.innerText= "Please enter your email";
                this.email.value = ""
                this.signUp.disabled = false
            }
        }
    })
}