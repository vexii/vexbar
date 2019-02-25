// @flow
import * as React from 'react'
import { type Lemonbar } from 'lemonbar'

export type ElementProps = {
  children: React.Node,
  onClick?: Function,
  fcolor?: string,
  bcolor?: string,
  offset: number,

}

class Element {

  isText: boolean
  type: string
  start: string
  end: string
  value: any
  onClick: Function
  children: Element[]
  bar: Lemonbar

  constructor( type: string, props: ElementProps, bar: Lemonbar): void {
    this.type = type
    this.children = []
    this.bar = bar
    this.start = ''
    this.end = ''

    switch(type) {
      case 'monitor': {
        this.value = props.possition
        this.start = `%{S${this.value}}`
      } break

      case 'left': {
        this.start = '%{l}'
      } break

      case 'center': {
        this.start = '%{c}'
      } break

      case 'right': {
        this.start = '%{r}'
      } break

      case 'font': {
        this.value = props.index
        this.start = `%{T${this.value}}`
      } break

      case 'text': {
        this.value = props.children
      } break

      case 'textNode': {
        this.value = props.children
        this.isText = true
      } break
    }

    if(props.onClick) {
      const id = bar.registerOnClick(props.onClick)
      this.start = `%{A:${id}:}` + this.start
      this.end += '%{A}' + this.end
    }

    if(props.fcolor) {
      this.start = `%{F${props.fcolor}}` + this.start
      this.end = '%{F-}' + this.end
    }

    if(props.bcolor) {
      this.start = `%{B${props.bcolor}}` + this.start
      this.end = '%{B-}' + this.end
    }

    if(props.offset) {
      this.start = `%{O${props.offset}}` + this.start
      this.end = '%{O-}' + this.end
    }

  }

  appendChild(child: Element): void {
    this.children.push(child)
  }

  removeChild({ children, bar }: Element, child: Element) {
    children.splice(children.indexOf(child), 1)
    bar.flush()
  }

  updateValue(value): void {
    this.value = value
    this.bar.flush();
  }

  toString(): string {
    if(this.isText){
      if(Array.isArray(this.value)) {
        const o = this.value.reduce((o, c) => o += c, '')
        return `${this.start}${o}${this.end}`
      }
      return `${this.start}${this.value}${this.end}`
    }

    const childrenString = this
      .children
      .filter(a => !!a)
      .reduce((o, childElement) => {
        o += childElement.toString()
        return o
      }, "")

    return `${this.start}${childrenString}${this.end}`
  }
};

export function createElement(
  type: string,
  props: Object,
  bar: Lemonbar,
): Element {
  return new Element(type, props, bar)
}
