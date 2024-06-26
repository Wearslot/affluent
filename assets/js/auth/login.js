if (!customElements.get('login-form')) {
  customElements.define('login-form', class loginForm extends HTMLElement {
      constructor() {
          super();
          
          this.loginForm = this.querySelector('#login-form')

          if (this.loginDetail) {
              this.email.value = this.loginDetail.email;
          }

          this.submitButton = this.querySelector('#submit');
          this.submitButton.addEventListener("click", this.login.bind(this));
      }

      login(event) {
          event.preventDefault();

          const data = new FormData(this.loginForm)
          const saveDetail = data.get('rememberme')

          this.submitButton.disabled = true
          if (saveDetail.checked === true) {
              const loginDetail = {
                email: data.get('userEmail'),
              };
              localStorage.setItem("loginDetail", JSON.stringify(loginDetail));
          } 

          if (data.values()) {
              const config = fetchConfig();
              config.body = JSON.stringify({
                email: data.get('userEmail'),
                password: data.get('password')
              })

              fetch(`${routes.auth_login}`, config)
              .then(response => response.json())
              .then(data => {
                this.forgotPassword.classList.add('hidden')
                  this.feedback.innerText = data.message
              })
              .catch(err => {
                  this.feedback.innerText = err.message
              });

          }
      }

      
  })
}