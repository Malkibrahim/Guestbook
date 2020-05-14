import React, { Component } from "react";
import { Route, Switch, Redirect, Link, BrowserRouter } from "react-router-dom";
import Login from "./login";
import Guestbook from "./guestbook";
import SignUp from "./sginup";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            {/* <Route
                path="/list"
                render={() => (
                  <List
                    handleShCard={this.handleShoppingCard}
                    handleEdit={this.handleEdit}
                  />
                )}
              />
              <Route
                path="/editProduct"
                render={(props) => (
                  <EditProduct {...props} item={this.state.item} />
                )}
              />
              
              <Route path="/addProduct" component={AddProduct} />
              <Route
              path="/details/:id"
              render={(props) => <Details {...props} />}
            /> */}
            <Route path="/register" component={SignUp} />

            <Route path="/login" component={Login} />
            <Route path="/book" component={Guestbook} />

            <Redirect from="/" exact to="/login" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
