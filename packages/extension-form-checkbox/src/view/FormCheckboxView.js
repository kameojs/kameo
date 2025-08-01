import { FormElementView } from '@kameo/core';

export class FormCheckboxView extends FormElementView {

  constructor(props, options = {}) {
    super(props, options);

    this._handleChange = this._handleChange.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);

    this._addEventListeners();
  }

  mount() {
    this.element = this.createElement();
    this.element.textContent = this.node.attrs.label;
    
    this.root = this.createView({
      element: this.element,
    });
  }

  _handleChange(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _handleInput(event) {
    this.updateAttributes({
      checked: event.target.checked,
    });

    this.editor.emitNodeEvent(this.node.type.name, 'input', { 
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
    this.element.addEventListener('change', this._handleChange);
    this.element.addEventListener('input', this._handleInput);
    this.element.addEventListener('focus', this._handleFocus);
    this.element.addEventListener('blur', this._handleBlur);
  }

  _removeEventListeners() {
    this.element.removeEventListener('change', this._handleChange);
    this.element.removeEventListener('input', this._handleInput);
    this.element.removeEventListener('focus', this._handleFocus);
    this.element.removeEventListener('blur', this._handleBlur);
  }

  update(node) {
    const result = super.update(node);

    if (!result) {
      return false;
    }

    this.element.textContent = this.node.attrs.label;
    
    return true;
  }

  destroy() {
    super.destroy();
    this._removeEventListeners();
  }
}
