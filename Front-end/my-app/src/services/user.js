import axios from "axios";
export async function registeration(User) {
  const { data } = axios.post("http://localhost:3000/User/register", User);
}
export async function login(user) {
  debugger;
  const { data } = await axios.post(`http://localhost:3000/User/login`, user);
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);

  console.log(data);
}
