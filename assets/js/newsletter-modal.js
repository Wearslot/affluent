if (!customElements.get('newletter-modal')) {
  customElements.define('newletter-modal', class NewsletterModal extends HTMLElement {
    constructor() {
        super();

        this.close = this.querySelector('.news-modal-close');
        this.close.addEventListener("click", this.disablePopup.bind(this));

        this.email = this.querySelector('#userEmail');
        this.submitBtn = this.querySelector('#submitEmail');
        this.submitBtn.addEventListener("click", this.onSubmit.bind(this));
    }

    disablePopup() {
      localStorage.setItem('disabledPopup', 'yes');
      setTimeout(() => {
          localStorage.removeItem('disabledPopup');
      }, 90000)
    }

    onSubmit(event) {
    event.preventDefault();
    if ( this.email.value !== "") {
      const config = fetchConfig();
      config.body = JSON.stringify({email: this.email.value})

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