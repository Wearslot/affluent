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
            this.signUp.querySelector('.loading__spinner').classList.remove('hidden');
            this.signUp.disabled = true
            if ( this.email.value !== "") {
                const config = fetchConfig();
                config.body = JSON.stringify({email: this.email.value})
                fetch(`${routes.newsletter_signup}`, config)
                .then(response => response.json())
                .then(data => {
                    this.signUp.querySelector('.loading__spinner').classList.add('hidden');
                    this.feedback.innerText= data.message;
                })
                .catch(e => {
                    console.log(e);
                });
            }
            else {
                this.signUp.querySelector('.loading__spinner').classList.add('hidden');
                this.feedback.innerText= "Please enter your email";
                this.email.value = ""
                this.signUp.disabled = false
            }
        }
    })
}