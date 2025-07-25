import { Extension } from '@kameo/core';
import { history, redo, undo } from '@kameo/pm/history';

/**
 * This extension allows you to undo and redo recent changes.
 */
export const UndoRedo = Extension.create({
  name: 'undoRedo',

  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500,
    };
  },

  addCommands() {
    return {
      undo: () => ({ state, dispatch }) => {
        return undo(state, dispatch)
      },
      redo: () => ({ state, dispatch }) => {
        return redo(state, dispatch)
      },
    };
  },

  addProseMirrorPlugins() {
    return [history(this.options)];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor.commands.undo(),
      'Shift-Mod-z': () => this.editor.commands.redo(),
      'Mod-y': () => this.editor.commands.redo(),

      // Russian keyboard
      'Mod-я': () => this.editor.commands.undo(),
      'Shift-Mod-я': () => this.editor.commands.redo(),
    };
  },
});
