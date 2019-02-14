//@flow

import * as React from 'react'
import Reconciler from 'react-reconciler'
import container, { type Lemonbar } from '../lemonbar'
import { createElement } from './element'

type RootHostContext = {

}

type ChildHostContext = {
  type: string
}

const hostConfig = {

  now: Date.now,

  getRootHostContext(rootContainer: Lemonbar) {
    console.log('getRootHostContext', rootContainer)
    return { rootContainer }
  },

  getChildHostContext(parentContext, fiberType, root) {
    // console.log('getChildHostContext', fiberType)
    return { type: fiberType }
  },

  shouldSetTextContent(type, props) {
    return false
  },

  createTextInstance(text, ...arg) {
    return createElement('text', { text })
  },


  createInstance(
    type: string,
    props,
    rootContainerInstance,
    hostContext,
    container,
  ) {
    // console.log('create Instance', type)
    return createElement(type, props)
  },

  appendInitialChild(parent: Element, child: Element) {
    // console.log('appendInitialChild')
    parent.appendChild(child)
  },

  finalizeInitialChildren(instance: Element, type: string) {
    // console.log('finalizeInitialChildren')
    return false
  },

  prepareForCommit() {
  },

  resetAfterCommit() {
  },

  appendChildToContainer(bar, tag) {
    bar.appendChildToContainer(tag)
    bar.flush()
  },

  commitTextUpdate(node, oldText, newText) {
    node.updateValue(newText)
  },

  supportsMutation: true,

};

const reconciler = Reconciler(hostConfig);

export function render(
  element: React.Node,
  lemonbar: {},
  callback: ?Function
): void {

  const container = reconciler.createContainer(lemonbar, false); 

  reconciler.updateContainer(
    element,
    container,
    null,
    callback
  )
}

