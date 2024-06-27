if (!customElements.get('login-form')) {
  customElements.define('login-form', class loginForm extends HTMLElement {
      constructor() {
          super();
          
          this.loginForm = this.querySelector('#login-form')

          if (this.loginDetail) {
              this.email.value = this.loginDetail.email;
          }
          this.feedback = this.querySelector('#feedback')
          this.feedback.classList.add('hidden')
          
          this.forgotPassword= this.querySelector('.lost_password')

          this.submitButton = this.querySelector('#submit');
          this.submitButton.addEventListener("click", this.login.bind(this));
      }

      login(event) {
          event.preventDefault();
          this.submitButton.disabled = true

          
          const data = new FormData(this.loginForm)
          console.log(data.get('userEmail'))
          // const saveDetail = data.get('rememberme')

          // if (saveDetail.checked === true) {
          //     const loginDetail = {
          //       email: data.get('userEmail'),
          //     };
          //     localStorage.setItem("loginDetail", JSON.stringify(loginDetail));
          // } 

          if (data.get('userEmail') && data.get('password')) {
              const config = fetchConfig();
              config.body = JSON.stringify({
                email: data.get('userEmail'),
                password: data.get('password')
              })

              console.log(config)

              fetch(`${routes.auth_login}`, config)
              .then(response => response.json())
              .then(data => {
                this.forgotPassword.classList.add('hidden')
                this.feedback.classList.remove('hidden')
                  this.feedback.innerText = data.message
              })
              .catch(err => {
                this.submitButton.disabled = false
                this.feedback.classList.remove('hidden')
                this.feedback.innerText = err.message
              });

          }
      }

      
  })
}