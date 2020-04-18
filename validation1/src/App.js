import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      fieldEntered: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`--SUBMITTING--
        First Name : ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email : ${this.state.email}
        Password: ${this.state.password}
        `);
    } else {
      let formErrors = this.state.formErrors;
      formErrors.firstName =
        this.state.firstName === null
          ? "First Name should not be empty"
          : formErrors.firstName;

      formErrors.lastName =
        this.state.lastName === null
          ? "Last Name should not be empty"
          : formErrors.lastName;

      formErrors.email =
        this.state.email === null
          ? "Email should not be empty"
          : formErrors.email;

      formErrors.password =
        this.state.password === null
          ? "Password should not be empty"
          : formErrors.password;
      this.setState({
        formErrors,
      });

      console.error("FORM INVALID -  DISPLAY ERRORMESSAGE");
      alert("Form is Invalid");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.handleValuesandErros(name, value);
    this.setState(
      {
        formErrors,
        [name]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleValuesandErros = (name, value) => {
    let formErrors = this.state.formErrors;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value == null || value.length < 3
            ? "Minimu 3 characters required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value == null || value.length < 3
            ? "Minimu 3 characters required"
            : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value == null || value.length < 3
            ? "Minimu 3 characters required"
            : "";
        break;
    }
    return formErrors;
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              ></input>
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              ></input>
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                name="email"
                noValidate
                onChange={this.handleChange}
              ></input>
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              ></input>
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="Submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
