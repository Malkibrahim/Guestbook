import axios from "./axios";

export async function GetItemById(id) {
  debugger;
  const { data } = await axios.get(`http://localhost:3000/reply/${id}`);
  console.log(data);
  return data.msg;
}
export async function AddReply(item) {
  debugger;
  const { data } = await axios.post(
    "http://localhost:3000/reply/add-reply",
    item
  );
  console.log(data.msg);
  return data.msg;
}
export async function Edit(item, id) {
  console.log(id);

  const { message } = await axios.patch(
    `http://localhost:3000/reply/edit/${id}`,
    item
  );
  console.log(message);
  return message;
}

export async function Delete(id) {
  debugger;
  const data = axios.delete(`http://localhost:3000/reply/delete/${id}`);
  console.log(data);
}
