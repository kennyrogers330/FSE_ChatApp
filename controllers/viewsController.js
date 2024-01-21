exports.login = (req, res, next) => {
  res.status(200).render("login", {
    title: "Enter chat room",
  });
};

exports.signUP = async (req, res, next) => {
  res.status(200).render("signup", {
    title: "Register for chat room",
  });
};

exports.chatBox = async (req, res, next) => {
  res.status(200).render("chatbox", {
    title: "Chat Box",
  });
};
