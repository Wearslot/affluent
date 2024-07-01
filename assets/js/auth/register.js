if (!customElements.get('register-form')) {
  customElements.define('register-form', class RegisterForm extends HTMLElement {
      constructor() {
          super();
          
          this.registerForm = this.querySelector('#register-form');

          this.feedback = this.querySelector('#feedback');
          this.feedback.classList.add('hidden')

          this.loadingSpinner = this.querySelector('.loading__spinner');

          this.submitButton = this.querySelector('#submit');
          this.submitButton.addEventListener("click", this.register.bind(this));
      }

      register(event) {
        event.preventDefault();
        this.activateLoadingState()

        const data = new FormData(this.registerForm)
        this.submitButton.disabled = true
    
        if (data.values()) {
          const config = fetchConfig();
          config.body = JSON.stringify({
            name: data.get('userName'),
            email: data.get('userEmail'),
            password: data.get('password'),
            confirm_password: data.get('confirm-password')
          })

          fetch(`${routes.auth_register}`, config)
          .then(response => response.json())
          .then(data => {
            this.deactivateLoadingState()
            this.feedback.innerText = data.message
          })
          .catch(err => {
            this.deactivateLoadingState()
            this.feedback.innerText = err.message
          });

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
      }

      
  })
}