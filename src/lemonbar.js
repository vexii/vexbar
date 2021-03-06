// @flow strict

import { spawn } from 'child_process'
import uuid from 'nanoid'
import type { Element } from 'render/element'

export type LemonbarType = {
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

type onClickFunctionsMap = Map<string, {
  fn: Function,
  props: Object
}>

export default function ({
  barColor = '#FF5AABE3',
  font = 'xft:Source Code Pro:style=Mono:size=15',
  fontColor = '#FF3497DB',
  name = 'piebar',
}: LemonbarFlags): LemonbarType {
  const bar = spawn('lemonbar', [
    '-n', name,
    '-F', fontColor,
    '-B', barColor,
    '-f', font,
    '-f', 'FontAwesome',
  ])

  const onClickFunctions: onClickFunctionsMap = new Map()

  bar.stdout.on('data', (data) => {
    const id = data.toString().replace(/\n|'/g, '')
    const onClickFunction = onClickFunctions.get(id)

    if (!onClickFunction) {
      return
    }
    const { fn, props } = onClickFunction

    if (fn) {
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
      onClickFunctions.set(id, { fn, props })
      return id
    },

    flush() {
      bar.stdin.write(
        children.reduce((output, node) => (
          output.concat(node.toString())
        ), ''),
      )
    },
  }
}
