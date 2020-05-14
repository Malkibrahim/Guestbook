import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import { registeration } from "./services/user";

class SignUp extends Component {
  state = {
    account: {
      emailAddress: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  };
  handleChange = (e) => {
    //Clone
    const account = { ...this.state.account };
    //Edit
    account[e.target.name] = e.target.value;

    //Set State
    this.setState({ account });
  };
  handleSubmit = async (e) => {
    //debugger;

    e.preventDefault();
    // this.validation();
    const data = await registeration(this.state.account);
    console.log(data);
    this.props.history.push("/login");

    console.log("submit");
  };
  render() {
    return (
      <React.Fragment>
        {/* <div>Guest</div> */}
        <form className="login">
          <Input
            name="username"
            label="Username"
            value={this.state.account.username}
            onChange={this.handleChange}
          />
          <Input
            name="emailAddress"
            label="Email"
            value={this.state.account.emailAddress}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={this.state.account.password}
            onChange={this.handleChange}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            value={this.state.account.confirmPassword}
            onChange={this.handleChange}
          />
          <Link
            onClick={(e) => {
              this.handleSubmit(e);
            }}
            className="btn btn--primary"
          >
            Register
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
