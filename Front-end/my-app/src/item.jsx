import React, { Component } from "react";
import Input from "./input";
import Reply from "./Reply";
import { Edit, GetAllReplies } from "./services/messages";
import { AddReply } from "./services/replies";

class Item extends Component {
  state = {
    reply: "",
    comment: {
      MessageId: null,
      userId: null,
      message: "",
      status: false,
    },
    Allcomments: [{}],
  };
  async componentDidMount() {}
  handleChange = (e) => {
    let reply = e.target.name;
    reply = e.target.value;
    //Set State
    this.setState({ reply: reply });
    console.log(this.state.reply);
  };
  handleAddReply = async (m) => {
    m.reply = false;
    await Edit(m, m._id);
    const comment = {
      MessageId: m._id,
      userId: localStorage.getItem("userId"),
      message: this.state.reply,
      status: true,
    };
    await AddReply(comment);
    this.setState({ comment });
    console.log(this.state.comment);

    // this.setState({ status: m.reply });
  };
  getCommenst = async (id) => {
    let Allcomments = [{}];
    Allcomments = await GetAllReplies(id);
    this.setState({ Allcomments });
    console.log(Allcomments);
    return Allcomments;
  };

  render() {
    const { messages, handleReply, handleEdit, handleDelete } = this.props;
    return messages.map((m) => {
      return (
        <React.Fragment>
          <div>
            <div>{m.message}</div>
            <div>{m.name}</div>
            <div className="crud-actions">
              <i onClick={() => handleEdit(m)} className="fas fa-edit"></i>

              <i
                onClick={() => {
                  handleDelete(m);
                }}
                className="fas fa-trash-alt"
              ></i>
              <i onClick={() => handleReply(m)} className="fas fa-reply"></i>
            </div>
          </div>
          {m.reply && (
            <React.Fragment>
              <Input
                name="reply"
                label="Reply"
                value={this.state.Reply}
                onChange={this.handleChange}
              />
              <button onClick={() => this.handleAddReply(m)}>add</button>
            </React.Fragment>
          )}

          {/* to review every message's replies *!!!}

          {/* {this.getCommenst(m._id).length !== 0 && (
            <Reply replies={this.state.Allcomments} />
          )} */}
        </React.Fragment>
      );
    });
  }
}

export default Item;
