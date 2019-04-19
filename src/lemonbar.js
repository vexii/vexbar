// @flow
import { spawn } from 'child_process'
import uuid from 'nanoid'

export type Lemonbar = {
  pid: number,
  appendChildToContainer(child: Element): void,
  registerOnClick(fn: Function, props: Object): string,
  flush(): void,
}

type LemonbarFlags = {
  barColor?: string,
  font?: string,
  fontColor?: string,
  name?: string,
}

type onClickFunctions = {
  [string]: {
    fn: Function,
    props: Object
  }
}

export default function({
  barColor = "#FF5AABE3", 
  font = "xft:Source Code Pro:style=Mono:size=15",
  fontColor = "#FF3497DB",
  name = "piebar",
}: LemonbarFlags): Lemonbar{
  const bar = spawn("lemonbar", [
    "-n", name,
    "-F", fontColor,
    "-B", barColor,
    "-f", font,
    "-f", "FontAwesome",
  ])

  const onClickFunctions: onClickFunctions = new Map()

  bar.stdout.on('data', (data) => {
    const id = data.toString().replace(/\n|'/g, "")
    const { fn, props } = onClickFunctions.get(id)

    if(fn) {
      fn(props)
    }

  })

  const children: Element[] = []

  return {
    pid: bar.pid,
    appendChildToContainer(child: Element) {
      children.push(child)
    },

    registerOnClick(fn, props) {
      const id = uuid()
      onClickFunctions.set(id, {fn, props})
      return id
    },

    flush(value) {
      bar.stdin.write(
        children.reduce((output, node) => (
          output.concat(node.toString())
        ), '')
      )
    }
  }
}
