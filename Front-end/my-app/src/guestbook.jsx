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
      reply: false,
    },
    reply: {
      MessageId: null,
      userId: null,
      name: "",
      message: "",
    },
    messages: [],
    replies: [],
    replyState: "",
  };
  async componentDidMount() {
    debugger;
    const messages = await GetAll();
    this.setState({ messages });
    console.log(this.state.info.reply);
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
    if (this.state.info._id == null) {
      const userId = localStorage.getItem("userId");
      this.state.info.userId = userId;
      const msg = {
        userId: this.state.info.userId,
        name: this.state.info.name,
        message: this.state.info.message,
        reply: false,
      };

      await Add(msg);
      const messages = await GetAll();
      this.setState({ messages });
    } else {
      const id = this.state.info._id;
      const msg = {
        userId: this.state.info.userId,
        name: this.state.info.name,
        message: this.state.info.message,
      };
      await Edit(msg, id);
      const messages = await GetAll();
      this.setState({ messages });
    }
  };
  handleEdit = async (msg) => {
    debugger;
    if (localStorage.getItem("userId") != msg.userId) {
      alert("You not authorized");
    } else {
      console.log(msg._id);
      const messages = this.state.messages.filter((m) => m._id != msg._id);
      const info = await GetItemById(msg._id);
      this.setState({ messages, info });
    }
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
  handleReply = async (msg) => {
    if (msg.reply == false) {
      msg.reply = true;
    } else {
      msg.reply = false;
    }
    await Edit(msg, msg._id);
    const reply = {
      MessageId: msg._id,
      userId: msg.userId,
      name: this.state.info.name,
      message: this.state.info.message,
    };
    this.setState({ reply });
  };
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.info.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            className="form-control"
            name="message"
            value={this.state.info.message}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={(e) => this.handleAdd(e)} className="btn btn--gray">
          Add
        </button>
        <Item
          messages={this.state.messages}
          handleReply={this.handleReply}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default Guestbook;
