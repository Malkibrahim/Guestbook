import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import { login } from "./services/user";

class Login extends Component {
  state = {
    account: {
      emailAddress: "",
      password: "",
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
    // debugger;

    // e.preventDefault();
    // this.validation();
    const data = await login(this.state.account);
    console.log(data);
    this.props.history.push("/book");

    console.log("submit");
  };
  render() {
    return (
      <React.Fragment>
        {/* <div>Guest</div> */}
        <form className="login">
          <Input
            name="emailAddress"
            label="E-mail"
            value={this.state.account.emailAddress}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={this.state.account.password}
            onChange={this.handleChange}
          />
          <Link
            to="/book"
            onClick={(e) => this.handleSubmit(e)}
            className="btn btn--primary"
          >
            Login
          </Link>
          <Link to="/register" className="btn btn--yellow">
            Sgin Up?
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
