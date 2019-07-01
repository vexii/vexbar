// @flow strict

import * as React from 'react'
import Reconciler from 'react-reconciler'
import container, { type Lemonbar } from '../lemonbar'
import { createElement, type ElementProps } from './element'

type RootHostContext = Lemonbar

type ChildHostContext = {
  type: string
} & RootHostContext

const hostConfig = {

  now: Date.now,

  getRootHostContext(rootContainer: RootHostContext) {
    return rootContainer
  },

  getChildHostContext(
    parentContext,
    fiberType,
    hostContext: RootHostContext
  ) {

    return { ...hostContext, type: fiberType }
  },

  shouldSetTextContent(
    type: string,
    props: ElementProps
  ) {
      return false
  },

  createTextInstance(
    text: string, 
    hostContext: RootHostContext, 
    childHostContext,
    fiber
  ) {
    return createElement('textNode', { children: text }, hostContext)
  },

  createInstance(
    type: string,
    props: ?Object,
    rootContainerInstance: Lemonbar,
    childHostContext: ChildHostContext,
    container,
  ) {
    return createElement(type, props, childHostContext)
  },

  appendInitialChild(parent: Element, child: Element) {
    parent.appendChild(child)
  },

  removeChild(parent, child) {
    parent.removeChild(child)
  },
  finalizeInitialChildren(instance: Element, type: string) {
    return false
  },

  prepareUpdate(
    node: Element,
    type: string,
    oldProps,
    newProps,
  ) {
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
    if(oldText !== newText) {
      node.updateValue(newText)
    }
  },

  insertBefore(...args) {
  },

  appendChild(parent: Element, child: Element) {
    parent.appendChild(child)
  },

  schedulePassiveEffects(...args) {
  },

  cancelPassiveEffects(...args) {
  },

  supportsMutation: true,

};

const reconciler = Reconciler(hostConfig);

export default function render(
  element: React.Node,
  lemonbar: Lemonbar,
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

