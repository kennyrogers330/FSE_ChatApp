let socket = io();

//DOM
const chatBody = document.querySelector(".chatBody");
const FSEchat = document.getElementById("ChatForm");
const loBtn = document.querySelector(".lo");

// Get username from URL
const username = window.location.pathname.split("/").pop();
socket.emit("joinRoom", username);

socket.on("message", (message) => {
  console.log(message);
  renderMessage(message);
  chatBody.scrollTop = chatBody.scrollHeight;
});

// socket.on("botmessage", (message) => {
//   console.log(message);
// });

socket.on("chatMessages", (chats) => {
  chats.forEach((msg) => {
    renderMessage(msg);
  });
  chatBody.scrollTop = chatBody.scrollHeight;
});

// post message
FSEchat.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const message = e.target.elements.text.value;

  // send message to server
  socket.emit("FseChatMessage", message);

  //clear textArea
  e.target.elements.text.value = "";
  e.target.elements.text.focus();
});

// Integrate message to DOM
function renderMessage(message) {
  const div = document.createElement("div");
  div.classList.add("fseMessage");

  const isSignedIn = message.username === username;

  div.innerHTML = `
  <nav class="navbar navbar-light bg-secondary-subtle">
    
      <span class="navbar-brand h6">${
        isSignedIn ? "Me" : message.username
      }</span>
      <span class="small"> ${message.time} </span>
    
  </nav>
  <div class="col-sm-12 col-md-12 col-lg-12">
    <p class="small">
      ${message.body}
    </p>
  </div>`;
  document.querySelector(".chatBody").appendChild(div);
}

const dropAlert = () => {
  const alert = document.querySelector(".alert");
  if (alert) {
    alert.parentElement.removeChild(alert);
  }
};

const displayAlert = (status, message) => {
  dropAlert();
  const box = `<div class="alert alert-${status}" role="alert">
  ${message}
</div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", box);
  window.setTimeout(dropAlert, 5000);
};

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/users/logout",
    });

    if (res.data.status === "loggedOut") {
      window.setTimeout(() => {
        location.assign(`/`);
      }, 1500);
    }
  } catch (err) {
    displayAlert("danger", "Something went wrong while logging out! Try again");
  }
};

if (loBtn) {
  loBtn.addEventListener("click", logout);
}
