// @flow
import { type Lemonbar } from 'lemonbar'

export type ElementProps = {
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
        this.start = ''
        this.end = ''
        this.value = props.text
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
      console.log('ppploc', props)
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
      return this.value
    }

    const childrenString = this
      .children
      .filter(a => !!a).reduce((o, childElement) => {
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
