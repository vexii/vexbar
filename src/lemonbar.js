// @flow
import { spawn } from 'child_process'

export type Lemonbar = {
  pid: string,
  appendChild(child: Element): void,
  flush(): void,
}

type LemonbarFlags = {
  barColor?: string,
  font?: string,
  fontColor?: string,
  name?: string,
}

export default function({
  barColor = "#FF5AABE3", 
  font = "xft:Source Code Pro:style=Mono:size=9",
  fontColor = "#FF3497DB",
  name = "piebar",
}: LemonbarFlags){
  const bar = spawn("lemonbar", [
    "-n", name,
    "-F", fontColor,
    "-B", barColor,
    "-f", font,
  ])

  bar.stdout.on('data', (data) => (
    console.log('stdout', data.toString().replace(/\n|'/g, ""))
  ))

  let children: Element[] = [];

  return {
    pid: bar.pid,
    appendChildToContainer(child: Element) {
      children.push(child);
    },
    flush() {
      bar.stdin.write(
        children.reduce((output, node) => output.concat(node.toString()), "")
      )
    }
  }
}
