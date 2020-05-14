import React, { Component } from "react";

class Item extends Component {
  state = {};
  render() {
    const { messages, handleEdit, handleDelete } = this.props;
    return messages.map((m) => {
      return (
        <React.Fragment>
          <div>
            <div>{m.message}</div>
            <div>{m.name}</div>
            <div className="crud-actions">
              <i onClick={() => handleEdit(m._id)} className="fas fa-edit"></i>

              <i
                onClick={() => {
                  handleDelete(m);
                }}
                className="fas fa-trash-alt"
              ></i>
              <i className="fas fa-reply"></i>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }
}

export default Item;
