import { Extension } from '@kameo/core';

/**
 * This extension allows to align text.
 */
export const TextAlign = Extension.create({
  name: 'textAlign',

  addOptions() {
    return {
      types: [],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: null,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              const alignment = element.style.textAlign;
              return this.options.alignments.includes(alignment) ? alignment : this.options.defaultAlignment;
            },
            renderHTML: (attributes) => {
              if (!attributes.textAlign) {
                return {};
              }
              return { style: `text-align: ${attributes.textAlign}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      /**
       * Set the text align attribute.
       * @param alignment The alignment.
       * @example editor.commands.setTextAlign('left')
       */
      setTextAlign: (alignment) => ({ commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }

        return this.options.types
          .map(type => commands.updateAttributes(type, { textAlign: alignment }))
          .every(response => response);
      },
      /**
       * Unset the text align attribute.
       * @example editor.commands.unsetTextAlign()
       */
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types
          .map(type => commands.resetAttributes(type, 'textAlign'))
          .every(response => response);
      },
      /**
       * Toggle the text align attribute.
       * @param alignment The alignment.
       * @example editor.commands.toggleTextAlign('right')
       */
      toggleTextAlign: (alignment) => ({ editor, commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }
        
        if (editor.isActive({ textAlign: alignment })) {
          return commands.unsetTextAlign();
        }
        return commands.setTextAlign(alignment);
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
      'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
      'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
      'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify'),
    };
  },
});
