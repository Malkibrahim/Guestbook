import Item from './item';
class Reply extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>View all replies</p>
        <div style={{marginLeft="50px"}}>
        <Item />

        </div>
      </div>
    );
  }
}

export default Reply;
