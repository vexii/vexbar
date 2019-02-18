//@flow

import * as React from 'react'
import Reconciler from 'react-reconciler'
import container, { type Lemonbar } from '../lemonbar'
import { createElement, type ElementProps } from './element'

type RootHostContext = Lemonbar

type ChildHostContext = {
  type: string
}

const hostConfig = {

  now: Date.now,

  getRootHostContext(rootContainer: RootHostContext) {
    return { rootContainer }
  },

  getChildHostContext(parentContext, fiberType, root) {
    return { type: fiberType }
  },

  shouldSetTextContent(
    type: string,
    { props }: { props: ?ElementProps }
  ) {
    console.log(type, props)
    if(props && props.onClick) {
      return true
    }
    return false
  },

  createTextInstance(text: string, hostContext: RootHostContext, ...args) {
    return createElement('text', { text }, hostContext)
  },


  createInstance(
    type: string,
    props: ?Object,
    rootContainerInstance: Lemonbar,
    hostContext: RootHostContext,
    container,
  ) {
    return createElement(type, props, hostContext)
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

  schedulePassiveEffects(...args) {
    console.log(args)
    return true
  },

  cancelPassiveEffects(...args) {
    console.log(args)
  },

  supportsMutation: true,

};

const reconciler = Reconciler(hostConfig);

export default function render(
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

