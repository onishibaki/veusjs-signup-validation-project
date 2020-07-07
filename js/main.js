Vue.component("signup-form", {
  template: `
  <div v-if="errors[0] == 'Success'" class="success-wrapper">
    <h2>You have successfully signed up</h2>
    <p>Thank you for signing up.</p>
    <p>Please check your email for further information.</p>
    <p class="goback-wrapper">This page will automatically go back to signed  up page shortly.</p>
  </div>
  <div v-else class="signup-form-wrapper">
    <div class="image-wrapper">
        <h4>Sign up Now!</h4>
    </div>
    <form class="signup-form" @submit.prevent="onSubmit">        
        <p class="already-signedup">Already signed up? <a href="#">Log in</a></p>

        <p class="required-text">All fields are required.</p>

        <transition name="slide-fade">
          <p v-if="showErrorMessage" class="error-messages">
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
        </transition>

        <div  class="firstName-wrapper">
          <label for="firstName">First name</label>
          <input type="text" id="firstName" v-model="userInfo.firstName" placeholder="First name">
        </div>
        <div class="lastName-wrapper">
          <label for="lastName">Last name</label>
          <input type="text" id="name" v-model="userInfo.lastName" placeholder="Last name">
        </div>
        <div class="email-wrapper">
          <label for="email">Email Address</label>
          <input type="text" id="email" v-model="userInfo.email" placeholder="Email Address">
        </div>
        <div class="password-wrapper">
          <label for="password">Password</label>
          <input :type="showPassword ? 'password' : 'text'" id="password" v-model="userInfo.password" placeholder="Password">
        
          <i v-on:click="onShowPassword" v-show="showPassword" class="fas fa-eye"></i>
          <i v-on:click="onShowPassword" v-show="!showPassword" class="fas fa-eye-slash"></i>
        
          <ul>
            <li>Minimum of 12 characters</li>
            <li>Must contain at least 2 upper case letters, 2 numbers, and 2 symbols</li>
          </ul>

        </div>
        <div class="cpassword-wrapper">
          <label for="cPassword">Confirm Password</label>
          <input :type="showCPassword ? 'password' : 'text'" id="cPassword" v-model="userInfo.cPassword" placeholder="Confirm Password">

          <i v-on:click="onShowCPassword" v-show="showCPassword" class="fas fa-eye"></i>
          <i v-on:click="onShowCPassword" v-show="!showCPassword" class="fas fa-eye-slash"></i>
          
        </div>
        <div class="terms-condition-wrapper">
          <input type="checkbox" id="termsCondition" v-model="userInfo.termsCondition">
          <label for="termsCondition">I agree to the <a href="#">Terms and Conditions.</a></label>
        </div>
        <div>
          <input v-on:click="onShowError" type="submit" value="SIGN UP">  
        </div>    
      </form>  
    </div>
    `,
  data() {
    return {
      userInfo: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        cPassword: null,
        termsCondition: false,
      },
      errors: [],
      showPassword: true,
      showCPassword: true,
      showErrorMessage: false,
    };
  },
  methods: {
    onSubmit() {
      //function for checking each field
      const displayError = ({
        firstName,
        lastName,
        email,
        password,
        cPassword,
        termsCondition,
      }) => {
        //constant error value of each field
        const erroMessages = {
          errorFirstName: "Please enter first name",
          errorLastName: "Please enter last name",
          errorEmail: "Please enter email address",
          errorPassword: {
            emptyField: "Please enter password",
            charLength: "Password must be at least 12 characters long",
            validCharacter:
              "Password must contain at least 2 upper case letters, 2 numbers, and 2 symbols",
          },
          errorConfirmPassword: {
            emptyField: "Please enter confirm password",
            notMatchPassword: "Confirm password doesn't match Password",
          },
          errorTermsConditions: "Please check the terms and conditions",
        };

        //regex validator of each field
        const validator = {
          emailValidator: /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/,
          passCharLength: new RegExp("^(?=(.*[a-zA-Z])).{12,}$"),
          passCharContain: new RegExp(
            "^(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=.*[_=+`!@#$%^&*'/.,-]{2,}).{12,}$"
          ),
        };

        let errorHandler = [];
        //Push error message if the value is null
        !firstName && errorHandler.push(erroMessages.errorFirstName);
        //Push error message if the value is null
        !lastName && errorHandler.push(erroMessages.errorLastName);
        //Push error message if the value is null and invalid email address
        if (!email) {
          errorHandler.push(erroMessages.errorEmail);
        } else if (!email.match(validator.emailValidator)) {
          errorHandler.push(erroMessages.errorEmail);
        }
        //Push error message if the value is null and not match
        if (!password) {
          errorHandler.push(erroMessages.errorPassword.emptyField);
        } else if (!password.match(validator.passCharLength)) {
          errorHandler.push(erroMessages.errorPassword.charLength);
        } else if (!password.match(validator.passCharContain)) {
          errorHandler.push(erroMessages.errorPassword.validCharacter);
        }
        //Push error message if the value is null and not match
        if (!cPassword) {
          errorHandler.push(erroMessages.errorConfirmPassword.emptyField);
        } else if (password != cPassword) {
          errorHandler.push(erroMessages.errorConfirmPassword.notMatchPassword);
        }

        if (!termsCondition) {
          errorHandler.push(erroMessages.errorTermsConditions);
        }

        return errorHandler;
      };

      //Set empty error array
      this.errors = [];
      //condition
      if (displayError(this.userInfo).length == 0) {
        (this.userInfo.firstName = null),
          (this.userInfo.lastName = null),
          (this.userInfo.email = null),
          (this.userInfo.password = null),
          (this.userInfo.cPassword = null),
          (this.userInfo.termsCondition = false);
        this.errors.push("Success");
        this.showErrorMessage = false;
        this.showPassword = true;
        this.showCPassword = true;
        setTimeout(() => (this.errors = []), 5000);
      } else {
        this.errors = displayError(this.userInfo);
      }
    },
    onShowPassword() {
      this.showPassword
        ? (this.showPassword = false)
        : (this.showPassword = true);
    },
    onShowCPassword() {
      this.showCPassword
        ? (this.showCPassword = false)
        : (this.showCPassword = true);
    },
    onShowError() {
      this.showErrorMessage = true;
    },
  },
});

Vue.component("temp-header", {
  template: `
    <header>   
      <div class="container">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
      </div>
    </header>
    `,
  data() {
    return {};
  },
});

Vue.component("temp-footer", {
  template: `
    <footer>   
      <div class="container">
          <p>Copyright © 2020</p>
          <ul>
            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i class="fab fa-line"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter-square"></i></a></li>
          </ul>
      </div>
    </footer>
    `,
  data() {
    return {};
  },
});

var app = new Vue({
  el: "#app",
});
