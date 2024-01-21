const signup = async (
  full_name,
  email,
  username,
  password,
  confirm_password
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/signup",
      data: {
        full_name: full_name,
        email: email,
        username: username,
        password: password,
        confirm_password: confirm_password,
      },
    });

    if (res.data.status === "persisted") {
      window.setTimeout(() => {
        location.assign(`/`);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  console.log(full_name, email, username, password, confirm_password);
  signup(full_name, email, username, password, confirm_password);
});
