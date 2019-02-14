// @flow

class Element {

  type: string
  start: string
  end: string
  value: any
  children: Element[]

  constructor(
    type: string,
    props: Object
  ) {
    this.type = type
    this.children = []
    switch(type) {

      case 'monitor': {
        this.value = props.possition
        this.start = `%{S${this.value}}`
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

      case 'text': {
        this.start = ''
        this.end = ''
        this.value = props.text
      } break
    }
  }

  appendChild(child: Element): void {
    this.children.push(child)
  }

  updateValue(value): void {
    this.value = value
  }

  toString(): string {
    const childrenString = this
      .children
      .filter(a => !!a).reduce((o, childElement) => {
        // console.log("child", childElement)
        o += childElement.toString()
        return o
      }, "")

    return `${this.start}${childrenString}${this.end}`
  }
};

export function createElement(
  type: string,
  props: Object,
): Element {
  return new Element(type, props)
}
