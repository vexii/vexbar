// @flow

class Element {
  type: string
  start: string
  end: string
  value: any
  children: Element[]

  constructor(type: string) {
    this.type = type
  }
  appendChild(child: Element): void {
    this.children.push(child)
  }
  toString(): string {
    const childrenString = this
      .children
      .reduce((_, childElement) => (
        _.concat(childElement.toString())
      ), "")

    return `${this.start} ${childrenString} ${this.end}`
  }
};

function createElement(
  type: string,
  props: Object,
): Element {
  return new Element(type)
}

module.exports = {
  createElement: createElement,
}
