if (!customElements.get('reset-form')) {
  customElements.define('reset-form', class ResetForm extends HTMLElement {
    constructor() {
      super();
      
      this.resetForm = this.querySelector('#reset-form')

      this.feedback = this.querySelector('#feedback')
      this.feedback.classList.add('hidden')
      
      this.loadingSpinner = this.querySelector('.loading__spinner');

      this.submitButton = this.querySelector('#submitt');
      this.submitButton.addEventListener("click", this.reset.bind(this));
    }

    reset(event) {
      event.preventDefault();
      this.activateLoadingState();

      const data = new FormData(this.resetForm)

      if (data.get('password') && data.get('confirm-password')) {

        if (data.get('password') !== data.get('confirm-password')) {
          this.deactivateLoadingState()
          this.feedback.innerText = "Passwords do not match"
        }
        else {
          let currentUrl = window.location.href;
          let urlSegments = currentUrl.split('/');

          // Get the last two segments
          const token = urlSegments[urlSegments.length - 1];
          const id = urlSegments[urlSegments.length - 2];

          const config = fetchConfig();
          config.body = JSON.stringify({
            password: data.get('password'),
            confirm_password: data.get('confirm-password'),
            id,
            token
          })

          fetch(`${routes.auth_reset_password}`, config)
          .then(response => response.json())
          .then(data => {
            this.deactivateLoadingState()
            this.feedback.innerText = data.message
            if (data.message === "Password reset successfully!") {
              setTimeout(() => {
                location.href = `${routes.auth_login}`
              }, 2000)
            }
          })
          .catch(err => {
            this.deactivateLoadingState()
            this.feedback.innerText = err.message
          });
        }
      } else {
        this.deactivateLoadingState()
        this.feedback.innerText = "Enter new password"
      }
    }

    activateLoadingState() {
      this.submitButton.disabled = true
      this.loadingSpinner.classList.remove('hidden');
    }

    deactivateLoadingState() {
      this.submitButton.disabled = false
      this.feedback.classList.remove('hidden')
      this.loadingSpinner.classList.add('hidden');
      this.resetForm.reset()
    }

      
  })
}