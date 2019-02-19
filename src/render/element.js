// @flow
import * as React from 'react'
import { type Lemonbar } from 'lemonbar'

export type ElementProps = {
  children: React.Node,
  onClick?: string
}

class Element {
  isText: boolean
  type: string
  start: string
  end: string
  value: any
  children: Element[]
  bar: Lemonbar

  constructor( type: string, props: Object, bar: Lemonbar): void {
    this.type = type
    this.children = []
    this.bar = bar
    this.start = ''
    this.end = ''

    switch(type) {
      case 'monitor': {
        this.value = props.possition
        this.start = `%{S${this.value}}`
        this.end = ''
      } break

      case 'left': {
        this.start = '%{l}'
        this.end = ''
      } break
      case 'center': {
        this.start = '%{c}'
        this.end = ''
      } break

      case 'right': {
        this.start = '%{r}'
        this.end = ''
      } break

      case 'font': {
        this.value = props.index
        this.start = `%{T${this.value}}`
        this.end = ''
      } break
      case 'text': {
        this.value = props.children
        this.isText = true
      } break
      case 'color': {
        this.value = props.color
        this.start = `%{F${this.value}}`
        this.end = '%{F-}'
      } break
      case 'bcolor': {

      } break
    }
    if(props.onClick) {
      this.start = `%{A:${props.onClick}:}` + this.start
      this.end += '%{A}'
    }
  }

  appendChild(child: Element): void {
    this.children.push(child)
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
