// @flow strict
import * as React from 'react'
import type { Lemonbar } from 'lemonbar'

export type ElementProps = {
  children: React.Node,
  onClick?: Function,
  fcolor?: string,
  bcolor?: string,
  offset: number,
  possition?: number,
  index?: number,
}


export class Element {
  isText: boolean

  type: string

  start: string

  end: string

  value: any

  onClick: Function

  children: Element[]

  bar: Lemonbar

  constructor(type: string, props: ElementProps, bar: Lemonbar): void {
    this.type = type
    this.children = []
    this.bar = bar
    this.start = ''
    this.end = ''

    switch (type) {
    case ('monitor'):
      if (!props.possition) {
        throw new Error('<monitor> tag requires a position prop')
      }
      this.start = `%{S${props.possition}}`
      break

    case 'left':
      this.start = '%{l}'
      break

    case 'center':
      this.start = '%{c}'
      break

    case 'right':
      this.start = '%{r}'
      break

    case 'font':
      if (!props.index) {
        throw new Error('<font> tag requires a index prop')
      }
      this.start = `%{T${props.index}}`
      break

    case 'text':
      this.value = props.children
      break

    case 'textNode':
      this.value = props.children
      this.isText = true
      break
    default:
      throw new Error(`${type} is not a valid element`)
    }

    if (props.onClick) {
      const id = bar.registerOnClick(props.onClick)
      this.start = `%{A:${id}:}${this.start}`
      this.end += `%{A}${this.end}`
    }

    if (props.fcolor) {
      this.start = `%{F${props.fcolor}}${this.start}`
      this.end = `%{F-}${this.end}`
    }

    if (props.bcolor) {
      this.start = `%{B${props.bcolor}}${this.start}`
      this.end = `%{B-}${this.end}`
    }

    if (props.offset) {
      this.start = `%{O${props.offset}}${this.start}`
      this.end = `%{O-}${this.end}`
    }
  }

  appendChild(child: Element): void {
    this.children.push(child)
  }

  removeChild({ children, bar }: Element, child: Element) {
    children.splice(children.indexOf(child), 1)
    bar.flush()
  }

  updateValue(value: string): void {
    this.value = value
    this.bar.flush()
  }

  toString(): string {
    if (this.isText) {
      if (Array.isArray(this.value)) {
        const o = this.value.concat('')
        return `${this.start}${o}${this.end}`
      }
      return `${this.start}${this.value}${this.end}`
    }

    const childrenString = this
      .children
      .filter(a => !!a)
      .reduce((o, childElement) => (
        o.concat(childElement.toString())
      ), '')

    return `${this.start}${childrenString}${this.end}`
  }
}

export function createElement(
  type: string,
  props: Object,
  bar: Lemonbar,
): Element {
  return new Element(type, props, bar)
}
