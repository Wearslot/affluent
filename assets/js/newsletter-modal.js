if (!customElements.get('newletter-modal')) {
    customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
        constructor() {
            super();

            this.close = this.querySelector('.news-modal-close');
            console.log(this.close)
            this.close.addEventListener("click", this.disablePopup.bind(this));

            // this.feedback = this.querySelector('#email_feedback');

            // this.email = this.querySelector('#email');

            // this.signUp = this.querySelectorAll('#signupButton').forEach(button => {
            //     button.addEventListener("click", this.onSubmit.bind(this));
            // });
        }

        disablePopup() {
            localStorage.setItem('disabledPopup', 'yes');
            setTimeout(() => {
                localStorage.removeItem('disabledPopup');
            }, 90000)
        }

        // onSubmit(event) {
        //     event.preventDefault();
        //     this.activateLoadingState()

        //     if ( this.email.value !== "") {

        //         const config = fetchConfig();
        //         config.body = JSON.stringify({email: this.email.value})
        //         fetch(`${routes.newsletter_signup}`, config)
        //         .then(response => response.json())
        //         .then(data => {
        //             this.deactivateLoadingState()
        //             this.feedback.innerText= data.message;
        //         })
        //         .catch(e => {
        //             console.log(e);
        //         });
        //     }
        //     else {
        //         this.deactivateLoadingState()
        //         this.feedback.innerText= "Please enter your email";
        //     }
        // }

        // activateLoadingState() {
        //     this.signUp.querySelector('.loading__spinner').classList.remove('hidden');
        //     this.signUp.disabled = true
        // }

        // deactivateLoadingState() {
        //     this.signUp.querySelector('.loading__spinner').classList.add('hidden');
        //     this.email.value = ""
        //     this.signUp.disabled = false
        // }
    })
}