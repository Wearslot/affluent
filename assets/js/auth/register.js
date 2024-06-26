if (!customElements.get('login-form')) {
  customElements.define('login-form', class loginForm extends HTMLElement {
      constructor() {
          super();
          
          this.registerForm = this.querySelector('#register-form')

          this.submitButton = this.querySelector('#submit');
          this.submitButton.addEventListener("click", this.register.bind(this));
      }

      register(event) {
          event.preventDefault();

          const data = new FormData(this.loginForm)
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
                  this.feedback.innerText = data.message
              })
              .catch(err => {
                this.submitButton.disabled = false
                this.feedback.innerText = err.message
              });

          }
      }

      
  })
}