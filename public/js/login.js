const dropAlert = () => {
  const alert = document.querySelector(".alert");
  if (alert) {
    alert.parentElement.removeChild(alert);
  }
};

const displayAlert = (status, message) => {
  dropAlert();
  const box = `<div class="alert alert-${status} text-center" role="alert">
  ${message}
</div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", box);
  window.setTimeout(dropAlert, 5000);
};

const login = async (username, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/login",
      data: {
        username: username,
        password,
      },
    });

    if (res.data.status === "login successful") {
      displayAlert("success", "Welcome to FSE ChatRoom");
      window.setTimeout(() => {
        location.assign(`/chatbox/${username}`);
      }, 1500);
    }
  } catch (err) {
    displayAlert("danger", err.response.data.error);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login(username, password);
});
