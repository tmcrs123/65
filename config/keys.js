if (process.env.NODE_ENV === "production") {
  module.exports = require("./dev");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./test");
} else {
  module.exports = require("./dev");
}
