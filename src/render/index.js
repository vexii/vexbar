//@flow

const React = require('react');
const Reconciler = require('react-reconciler'); 
const container = require('../lemonbar');
const { createElement } = require('./element');

const hostConfig = {

  now: Date.now,

  getRootHostContext(rootContainer) {
    console.log('getRootHostContext', rootContainer)
    return {}
  },

  getChildHostContext(parentContext, fiberType, root) {
    console.log('getChildHostContext', fiberType)
    return { }
  },

  shouldSetTextContent(type, props) {
    return type === 'text' ||
      typeof props.children === 'string' ||
      typeof props.children === 'number' 
  },

  createTextInstance(text) {
    console.log('createTextInstance', text)
    return {
      type: 'text',
      startTag: '',
      endTag: '',
      toString() {
        return text
      }
    }
  },


  createInstance(
    type: string,
    props,
    rootContainerInstance,
    hostContext,
    container,
  ) {
    console.log('create Instance')
    return createElement(type, props)
  },

  appendInitialChild() {
    console.log('appendInitialChild')
  },

  appendAllChildren() {
    console.log('bulu ')
  },

  appendChildToContainer(bar, container, tag) {
    console.log('appendChildToContainer', container, bar);
    bar.appendChildToContainer(tag)
    return { appendChildToContainer: '' }
  },

  finalizeInitialChildren(...args) {
    console.log('finalizeInitialChildren')
    return false
  },

  appendInitial(...args) {
    console.log('appendInitial', args)
    return { appendInitial: '' };
  },

  prepareForCommit(...args) {
    console.log('prepareForCommit', args);
    return { prepareForCommit: '' }
  },

  resetAfterCommit(...args) {
    console.log('resetAfterCommit', args);
    return { resetAfterCommit: '' }
  },

  commitMount(...args) {
    console.log('commitMount', args)
  },

  supportsMutation: false,
};

const reconciler = Reconciler(hostConfig);

function render(element, lemonbar, callback) {

  const container = reconciler.createContainer(lemonbar, false); 

  reconciler.updateContainer(
    element,
    container,
    null,
    callback
  )
}

function App({ monitors }) {
  return (
    <React.Fragment>
      {monitors.map((monitor, idx) => (
        <monitor name={monitor} possition={idx} key={monitor}>
        </monitor>
      ))}
    </React.Fragment>
  )
}

render(
  <App monitors={['portrait']} />,
  container.init({
    fontColor: "#d0d0d0",
    barColor: "#3a3a3a",
    format: function({ title, clock }) {
      return `%{S0}%{r}${clock}%{S1}%{c}${title}%{r}%{A1:reboot:} reboot %{A}${clock}`
    }
  })
)
