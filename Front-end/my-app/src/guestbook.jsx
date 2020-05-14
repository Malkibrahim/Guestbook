import React, { Component } from "react";
import { Link } from "react-router";
import { GetAll, Add, Edit, GetItemById, Delete } from "./services/messages";
import Item from "./item";
class Guestbook extends Component {
  state = {
    info: {
      _id: null,
      userId: null,
      name: "",
      message: "",
    },
    messages: [],
  };
  async componentDidMount() {
    debugger;
    const messages = await GetAll();
    this.setState({ messages });
  }
  handleChange = (e) => {
    //Clone
    const info = { ...this.state.info };
    //Edit
    info[e.target.name] = e.target.value;
    //Set State
    this.setState({ info });
    console.log(this.state.info);
  };
  handleAdd = async (e) => {
    debugger;
    if (this.state.info._id == null) {
      const userId = localStorage.getItem("userId");
      this.state.info.userId = userId;
      const msg = {
        userId: this.state.info.userId,
        name: this.state.info.name,
        message: this.state.info.message,
      };

      const data = await Add(msg);
      console.log(data);
    } else {
      const id = this.state.info._id;
      const msg = {
        userId: this.state.info.userId,
        name: this.state.info.name,
        message: this.state.info.message,
      };
      const messages = await Edit(msg, id);
      // this.setState({ messages });
    }
  };
  handleEdit = async (id) => {
    debugger;
    console.log(id);
    const messages = this.state.messages.filter((msg) => msg._id != id);
    const info = await GetItemById(id);
    this.setState({ messages, info });
  };
  handleDelete = async (msg) => {
    debugger;
    if (localStorage.getItem("userId") != msg.userId) {
      alert("You not authorized");
    } else {
      const originalData = { ...this.state.info };
      const newState = { ...this.state };
      const newMsgs = newState.messages.filter((m) => m._id !== msg._id);
      this.setState({ messages: newMsgs });
      try {
        await Delete(msg._id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          alert("already deleted");
        }
        this.setState({ messages: originalData });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>

        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.info.name}
        />
        <label htmlFor="message">Message</label>

        <textarea
          name="message"
          value={this.state.info.message}
          onChange={this.handleChange}
        />
        <button onClick={(e) => this.handleAdd(e)} className="btn btn--gray">
          Add
        </button>
        <Item
          messages={this.state.messages}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default Guestbook;
