import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
  name: createSettingControl({
    key: 'name',
    attr: 'name',
    label: 'Name',
    description: 'Name of the field',
  }),
  label: createSettingControl({
    key: 'label',
    attr: 'label',
    label: 'Label',
    description: `The textarea's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The textarea's hint`,
  }),
  placeholder: createSettingControl({
    key: 'placeholder',
    attr: 'placeholder',
    label: 'Placeholder',
    description: 'Placeholder text to show as a hint when the input is empty',
  }),
  rows: createSettingControl({
    key: 'rows',
    attr: 'rows',
    label: 'Rows',
    description: 'The number of rows to display by default',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'appearance',
  }),
  resize: createSettingControl({
    key: 'resize',
    attr: 'resize',
    label: 'Resize',
    description: 'Controls how the textarea can be resized',
    control: {
      name: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'Vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'both', label: 'Both' },
        { value: 'auto', label: 'Auto' },
      ],
    },
    section: 'appearance',
  }),
  readonly: createSettingControl({
    key: 'readonly',
    attr: 'readonly',
    label: 'Readonly',
    description: 'Makes the textarea readonly',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: 'Makes the textarea a required field',
    control: {
      name: 'checkbox',
    },
    section: 'validation',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the textarea',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The textarea's size`,
    control: {
      name: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'inherit', label: 'Inherit' },
      ],
    },
    section: 'appearance',
  }),
  appearance: createSettingControl({
    key: 'appearance',
    attr: 'appearance',
    label: 'Appearance',
    description: `The textarea's visual appearance`,
    control: {
      name: 'select',
      options: [
        { value: 'filled', label: 'Filled' },
        { value: 'outlined', label: 'Outlined' },
      ],
    },
    section: 'appearance',
  }),
  minlength: createSettingControl({
    key: 'minlength',
    attr: 'minlength',
    label: 'Minlength',
    description: 'The minimum length of input that will be considered valid',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  maxlength: createSettingControl({
    key: 'maxlength',
    attr: 'maxlength',
    label: 'Maxlength',
    description: 'The maximum length of input that will be considered valid',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  autocapitalize: createSettingControl({
    key: 'autocapitalize',
    attr: 'autocapitalize',
    label: 'Autocapitalize',
    description: 'Controls whether and how text input is automatically capitalized as it is entered by the user',
    control: {
      name: 'select',
      options: [
        { value: 'off', label: 'Off' },
        { value: 'none', label: 'None' },
        { value: 'on', label: 'On' },
        { value: 'sentences', label: 'Sentences' },
        { value: 'words', label: 'Words' },
        { value: 'characters', label: 'Characters' },
      ],
    },
    section: 'other',
  }),
  autocorrect: createSettingControl({
    key: 'autocorrect',
    attr: 'autocorrect',
    label: 'Autocorrect',
    description: `Indicates whether the browser's autocorrect feature is on or off`,
    control: {
      name: 'select',
      options: [
        { value: 'off', label: 'Off' },
        { value: 'on', label: 'On' },
      ],
    },
    section: 'other',
  }),
  autofocus: createSettingControl({
    key: 'autofocus',
    attr: 'autofocus',
    label: 'Autofocus',
    description: 'Indicates that the input should receive focus on page load',
    control: {
      name: 'checkbox',
    },
    section: 'other',
  }),
  enterkeyhint: createSettingControl({
    key: 'enterkeyhint',
    attr: 'enterkeyhint',
    label: 'Enterkeyhint',
    description: 'Used to customize the label or icon of the Enter key on virtual keyboards',
    control: {
      name: 'select',
      options: [
        { value: 'enter', label: 'Enter' },
        { value: 'done', label: 'Done' },
        { value: 'go', label: 'Go' },
        { value: 'next', label: 'Next' },
        { value: 'previous', label: 'Previous' },
        { value: 'search', label: 'Search' },
        { value: 'send', label: 'Send' },
      ],
    },
    section: 'other',
  }),
  spellcheck: createSettingControl({
    key: 'spellcheck',
    attr: 'spellcheck',
    label: 'Spellcheck',
    description: 'Enables spell checking on the textarea',
    control: {
      name: 'checkbox',
    },
    section: 'other',
  }),
  inputmode: createSettingControl({
    key: 'inputmode',
    attr: 'inputmode',
    label: 'Inputmode',
    description: 'Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices',
    control: {
      name: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'text', label: 'Text' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'numeric', label: 'Numeric' },
        { value: 'tel', label: 'Tel' },
        { value: 'search', label: 'Search' },
        { value: 'email', label: 'Email' },
        { value: 'url', label: 'Url' },
      ],
    },
    section: 'other',
  }),
});
