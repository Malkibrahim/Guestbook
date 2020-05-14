import React, { Component } from "react";

class Reply extends Component {
  render() {
    const { replies } = this.props;
    return (
      <div>
        {replies.map((r) => {
          return <p>{r.message}</p>;
        })}
      </div>
    );
  }
}

export default Reply;
