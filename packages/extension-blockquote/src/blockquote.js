import { Node, mergeAttributes, wrappingInputRule } from '@kameo/core';

/**
 * Matches a blockquote to a `>` as input.
 */
export const inputRegex = /^\s*>\s$/;

/**
 * The extension allows to create blockquotes.
 */
export const Blockquote = Node.create({
  name: 'blockquote',

  content: 'block+',

  group: 'block',

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'blockquote' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      /**
       * Set a blockquote node.
       */
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      /**
       * Toggle a blockquote node.
       */
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      /**
       * Unset a blockquote node.
       */
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name);
      },
    }
  },
  
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
