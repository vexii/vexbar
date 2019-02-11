const { spawn } = require("child_process");

module.exports = {
  init: function({
    barColor = "#FF5AABE3", 
    font = "xft:Source Code Pro:style=Mono:size=9",
    fontColor = "#FF3497DB",
    format,
    name = "piebar",
  }) {
    const bar = spawn("lemonbar", [
      "-n", name,
      "-F", fontColor,
      "-B", barColor,
      "-f", font,
      "-o", "2",
    ]);

    return {
      write: function(state) {
        bar.stdin.write(format(state));
      }
    }
  }
};
