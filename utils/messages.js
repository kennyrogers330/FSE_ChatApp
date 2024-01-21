const moment = require("moment");
function Messageformatter(username, body) {
  return {
    username,
    body,
    time: moment().format("DD.MM.YYYY h:mm a"),
  };
}

module.exports = Messageformatter;
