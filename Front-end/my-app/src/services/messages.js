import axios from "./axios";
export async function GetAll() {
  debugger;
  const { data } = await axios.get("http://localhost:3000/message");
  return data.msgs;
}

export async function Delete(id) {
  debugger;
  const data = axios.delete(`http://localhost:3000/message/delete/${id}`);
  console.log(data);
}
export async function GetItemById(id) {
  debugger;
  const { data } = await axios.get(`http://localhost:3000/message/${id}`);
  console.log(data);
  return data.msg;
}
export async function Add(item) {
  debugger;
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    "http://localhost:3000/message/add-message",
    item
  );
  console.log(data.msg);
  return data.msg;
}
export async function Edit(item, id) {
  console.log(id);

  const { message } = await axios.patch(
    `http://localhost:3000/message/edit/${id}`,
    item
  );
  console.log(message);
  return message;
}
export async function GetAllReplies(id) {
  debugger;
  console.log(id);

  const { replies } = await axios.get(
    `http://localhost:3000/message/replies/${id}`
  );
  console.log(replies);
  return replies;
}
