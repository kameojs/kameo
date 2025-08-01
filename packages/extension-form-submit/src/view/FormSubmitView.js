import { FormElementView } from '@kameo/core';

export class FormSubmitView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this._handleClick = this._handleClick.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleSubmitResult = this._handleSubmitResult.bind(this);

    this._addEventListeners();
  }

  mount() {
    this.element = this.createElement();
    this.element.textContent = this.node.attrs.label;

    this.root = this.createView({
      element: this.element,
    });
  }

  _handleClick(event) {
    if (this.editor.documentMode === 'edit') {
      return;
    }

    if (typeof this.options.handleClick === 'function') {
      this.options.handleClick({
        event,
        editor: this.editor,
        nodeView: this,
      });
      return;
    }
    
    this._handleSubmit(event);
    
    this.editor.emitNodeEvent(this.node.type.name, 'click', { 
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

  _handleSubmit(event) {
    const { loading, disabled } = this.node.attrs;
    const { submitProps, disableOnSubmit } = this.options;

    if (loading || disabled) {
      return;
    }

    if (disableOnSubmit) {
      this.updateAttributes({ 
        loading: true, 
        disabled: true, 
      });
    }

    this.editor.submit({ ...submitProps });
  }

  _handleSubmitResult() {
    const { disableOnSubmit } = this.options;

    if (disableOnSubmit) {
      this.updateAttributes({ 
        loading: false, 
        disabled: false, 
      });
    }
  }

  _addEventListeners() {
    this.editor.on('submit:result', this._handleSubmitResult);
    this.element.addEventListener('click', this._handleClick);
    this.element.addEventListener('focus', this._handleFocus);
    this.element.addEventListener('blur', this._handleBlur);
  }

  _removeEventListeners() {
    this.editor.off('submit:result', this._handleSubmitResult);
    this.element.removeEventListener('click', this._handleClick);
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
