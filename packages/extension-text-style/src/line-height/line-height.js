import '../text-style/index.js';

import { Extension } from '@kameo/core';

export const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight: (lineHeight) => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight }).run();
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight: null }).removeEmptyTextStyle().run();
      },
    }
  },
});
