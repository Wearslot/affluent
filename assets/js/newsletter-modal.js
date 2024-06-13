class NewsletterForm {
    constructor(formElement) {
        this.formElement = formElement;
        this.close = this.formElement.querySelector('.news-modal-close');
        this.feedback = this.formElement.querySelector('#email_feedback');
        this.email = this.formElement.querySelector('#email');

        if (this.close) {
            this.close.addEventListener("click", this.disablePopup.bind(this));
        }

        this.formElement.querySelectorAll('#signupButton').forEach(button => {
            button.addEventListener("click", this.onSubmit.bind(this));
        });
    }

    disablePopup() {
        localStorage.setItem('disabledPopup', 'yes');
        setTimeout(() => {
            localStorage.removeItem('disabledPopup');
        }, 90000);
    }

    onSubmit(event) {
        event.preventDefault();
        this.activateLoadingState();

        if (this.email && this.email.value !== "") {
            const config = fetchConfig();
            config.body = JSON.stringify({ email: this.email.value });

            fetch(`${routes.newsletter_signup}`, config)
            .then(response => response.json())
            .then(data => {
                this.deactivateLoadingState();
                this.feedback.innerText = data.message;
            })
            .catch(err => {
                this.deactivateLoadingState();
                this.feedback.innerText = err.message;
            });
        } 
        else {
            this.deactivateLoadingState();
            this.feedback.innerText = "Please enter your email";
        }
    }

    activateLoadingState() {
        const loadingSpinner = this.formElement.querySelector('.loading__spinner');
        const signUpButton = this.formElement.querySelector('#signupButton');
        loadingSpinner.classList.remove('hidden');
        signUpButton.disabled = true;
    }

    deactivateLoadingState() {
        const loadingSpinner = this.formElement.querySelector('.loading__spinner');
        const signUpButton = this.formElement.querySelector('#signupButton');
        loadingSpinner.classList.add('hidden');
        this.email.value = "";
        signUpButton.disabled = false;
    }
}

if (!customElements.get('newletter-modal')) {
    customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            new NewsletterForm(this);
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const footerForm = document.querySelector('[form-id="newsletter_form"]')
    new NewsletterForm(footerForm);
});