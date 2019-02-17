// @flow
const { spawn } = require("child_process");

export type Lemonbar = {
  pid: string,
  appendChild(child: Element): void,
  flush(): void,
}

type LemonbarFlags = {
  barColor?: string,
  font?: string,
  fontColor?: string,
  format?: Function,
  name?: string,
}

module.exports = {

  init: function({
    barColor = "#FF5AABE3", 
    font = "xft:Source Code Pro:style=Mono:size=9",
    fontColor = "#FF3497DB",
    format,
    name = "piebar",
  }: LemonbarFlags) {

    const bar = spawn("lemonbar", [
      "-n", name,
      "-F", fontColor,
      "-B", barColor,
      "-f", font,
    ]);

    let children: Element[] = [];

    return {
      pid: bar.pid,
      appendChildToContainer(child: Element) {
        children.push(child);
      },
      flush() {
        console.log(
          'FLUSH',
          children.reduce((output, node) => output.concat(node.toString()), "")
        )
        bar.stdin.write(
          children.reduce((output, node) => output.concat(node.toString()), "")
        )
      }
    }
  }
};
