import { FormElementView } from '@kameo/core';

export class FormInputView extends FormElementView {

  constructor(props, options = {}) {
    super(props, options);

    this._handleInput = this._handleInput.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);

    this._addEventListeners();
  }

  mount() {
    this.element = this.createElement();
    
    this.root = this.createView({
      element: this.element,
    });
  }

  _handleInput(event) {
    this.updateAttributes({
      value: event.target.value,
    });

    this.editor.emitNodeEvent(this.node.type.name, 'input', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _handleChange(event) {
    this.updateAttributes({
      value: event.target.value,
    });
    
    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }


  _handleFocus(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'focus', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _handleBlur(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'blur', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _addEventListeners() {
    this.element.addEventListener('input', this._handleInput);
    this.element.addEventListener('change', this._handleChange);
    this.element.addEventListener('focus', this._handleFocus);
    this.element.addEventListener('blur', this._handleBlur);
  }

  _removeEventListeners() {
    this.element.removeEventListener('input', this._handleInput);
    this.element.removeEventListener('change', this._handleChange);
    this.element.removeEventListener('focus', this._handleFocus);
    this.element.removeEventListener('blur', this._handleBlur);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this._removeEventListeners();
  }
}
