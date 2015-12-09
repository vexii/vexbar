const combineReducers = require("redux").combineReducers;
const clock = require("./colck");
module.exports = combineReducers({
  clock,
});
