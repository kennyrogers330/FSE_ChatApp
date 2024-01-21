const users = [];

// Join FSE Chat
function AddUserToChat(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Get The SignedIn user
function getTheConnectedUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat room
function onExist(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//

module.exports = {
  AddUserToChat,
  getTheConnectedUser,
  onExist,
};
