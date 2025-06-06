export const formFields = [
  {
    id: 'formSubmit',
    title: 'Submit',
    fieldType: 'formSubmit',
    attrs: {},
  },
  {
    id: 'formInputText',
    title: 'Text',
    fieldType: 'formInput',
    attrs: {
      type: 'text',
      name: 'text',
      label: 'Enter your info',
      placeholder: 'Enter info',
    },
  },
  {
    id: 'formInputName',
    title: 'Name',
    fieldType: 'formInput',
    attrs: {
      type: 'text',
      name: 'name',
      label: 'Enter your full name',
      placeholder: 'Enter full name',
    },
  },
  {
    id: 'formInputEmail',
    title: 'Email',
    fieldType: 'formInput',
    attrs: {
      type: 'email',
      name: 'email',
      label: 'Enter your email',
      placeholder: 'Enter email',
    },
  },
  {
    id: 'formInputNumber',
    title: 'Number',
    fieldType: 'formInput',
    attrs: {
      type: 'number',
      name: 'number',
      label: 'Enter number',
      placeholder: 'Enter number',
    },
  },
  {
    id: 'formInputDate',
    title: 'Date',
    fieldType: 'formInput',
    attrs: {
      type: 'date',
      name: 'date',
      label: 'Select date',
    },
  },
  {
    id: 'formInputTime',
    title: 'Time',
    fieldType: 'formInput',
    attrs: {
      type: 'time',
      name: 'time',
      label: 'Select time',
    },
  },
  {
    id: 'formTextarea',
    title: 'Textarea',
    fieldType: 'formTextarea',
    attrs: {
      name: 'textarea',
    },
  },
  {
    id: 'formCheckbox',
    title: 'Checkbox',
    fieldType: 'formCheckbox',
    attrs: {
      name: 'checkbox',
    },
  },
  {
    id: 'formSelect',
    title: 'Select',
    fieldType: 'formSelect',
    attrs: {
      name: 'select',
      options: [
        {
          value: 'option-1',
          label: 'Option 1',
          disabled: false,
        },
        {
          value: 'option-2',
          label: 'Option 2',
          disabled: false,
        },
      ],
    },
  },
  {
    id: 'formRadioOptions',
    title: 'Radio options',
    fieldType: 'formRadioOptions',
    attrs: {
      name: 'radio-options',
      options: [
        {
          value: 'option-1',
          label: 'Option 1',
          disabled: false,
        },
        {
          value: 'option-2',
          label: 'Option 2',
          disabled: false,
        },
      ],
    },
  },
  {
    id: 'formRadioButtons',
    title: 'Radio buttons',
    fieldType: 'formRadioButtons',
    attrs: {
      name: 'radio-buttons',
      options: [
        {
          value: 'option-1',
          label: 'Option 1',
          disabled: false,
        },
        {
          value: 'option-2',
          label: 'Option 2',
          disabled: false,
        },
      ],
    },
  },
  {
    id: 'formRadioYesNo',
    title: 'Yes/No',
    fieldType: 'formRadioButtons',
    attrs: {
      name: 'radio-buttons',
      options: [
        {
          value: 'yes',
          label: 'Yes',
          disabled: false,
        },
        {
          value: 'no',
          label: 'No',
          disabled: false,
        },
      ],
      orientation: 'horizontal',
    },
  },
  {
    id: 'formSignature',
    title: 'Signature',
    fieldType: 'formSignature',
    attrs: {},
  },
  {
    id: 'formRating',
    title: 'Rating',
    fieldType: 'formRating',
    attrs: {
      name: 'rating',
    },
  },
  {
    id: 'formSwitch',
    title: 'Switch',
    fieldType: 'formSwitch',
    attrs: {
      name: 'switch',
    },
  },
  {
    id: 'formSlider',
    title: 'Slider',
    fieldType: 'formSlider',
    attrs: {
      name: 'slider',
    },
  },
];
