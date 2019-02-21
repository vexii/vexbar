// @flow
import { spawn } from 'child_process'
import uuid from 'nanoid'

export type Lemonbar = {
  pid: number,
  appendChildToContainer(child: Element): void,
  registerOnClick(fn: Function): string,
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
}: LemonbarFlags): Lemonbar{
  const bar = spawn("lemonbar", [
    "-n", name,
    "-F", fontColor,
    "-B", barColor,
    "-f", font,
  ])

  const onClickFunctions = new Map()

  bar.stdout.on('data', (data) => {
    const id = data.toString().replace(/\n|'/g, "")
    const onClick: Function = onClickFunctions.get(id)
    onClick()
  })

  const children: Element[] = [];

  return {
    pid: bar.pid,
    appendChildToContainer(child: Element) {
      children.push(child);
    },
    registerOnClick(fn) {
      const id = uuid();
      onClickFunctions.set(id, fn)
      return id
    },
    flush(value) {
      bar.stdin.write(
        children.reduce((output, node) => output.concat(node.toString()), "")
      )
    }
  }
}
