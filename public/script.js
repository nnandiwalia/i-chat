console.log("hiii");
const socket = io("http://localhost:3000");
const messagescontainer = document.getElementById("message-container");
const form = document.getElementById("sendcontainer");
const messageinput = document.getElementById("messageinput");
const sendbtn = document.getElementById("sendbutton");
const msg = document.querySelector(".message");
let pkmn = ["Abhi", "Sahul", "Shiv", "Simi", "Sanjay"];
// let i = prompt("enter your name ");
let username = pkmn[Math.floor(Math.random() * pkmn.length)];
appendmessage("you joined the chat", "right");
console.log(username);
socket.emit("new-user", username);
socket.on("user-connected", (user) => {
  appendmessage(user + " " + "joined the chat", "left");
});
socket.on("user-disconnected", (user) => {
  appendmessage(user + " " + "left the chat", "left");
});
socket.on("chatt-message", (data) => {
  // console.log(data);
  appendmessage(data.user + ":" + " " + data.data, "left");
});
sendbtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("send-chatt-message", messageinput.value);
  // console.log(messageinput.value);
  appendmessage("You" + ":" + " " + messageinput.value, "right");
  messageinput.value = "";
});

function appendmessage(data, dir) {
  let message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(dir);
  message.textContent = data;
  messagecontainer.appendChild(message);
}
