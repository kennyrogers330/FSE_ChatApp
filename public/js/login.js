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
      window.setTimeout(() => {
        location.assign(`/chatbox/${username}`);
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    alert(err.response.data.error);
    // console.log(err.response);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login(username, password);
});
