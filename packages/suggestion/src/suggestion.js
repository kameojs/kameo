import { Plugin, PluginKey } from '@kameo/pm/state';
import { Decoration, DecorationSet } from '@kameo/pm/view';
import { findSuggestionMatch as defaultFindSuggestionMatch } from './findSuggestionMatch.js';

// for reference.
// https://github.com/ueberdosis/tiptap/tree/next/packages/suggestion

export const SuggestionPluginKey = new PluginKey('suggestion');

export function Suggestion({
  pluginKey = SuggestionPluginKey,
  editor,
  char = '@',
  allowSpaces = false,
  allowToIncludeChar = false,
  allowedPrefixes = [' '],
  startOfLine = false,
  decorationTag = 'span',
  decorationClass = 'suggestion',
  command = () => null,
  items = () => [],
  render = () => ({}),
  allow = () => true,
  findSuggestionMatch = defaultFindSuggestionMatch,
}) {
  let props;
  const renderer = render?.();

  const plugin = new Plugin({
    key: pluginKey,

    view() {
      return {
        update: async (view, prevState) => {
          const prev = this.key?.getState(prevState);
          const next = this.key?.getState(view.state);

          // See how the state changed
          const moved = prev.active && next.active && prev.range.from !== next.range.from;
          const started = !prev.active && next.active;
          const stopped = prev.active && !next.active;
          const changed = !started && !stopped && prev.query !== next.query;

          const handleStart = started || (moved && changed);
          const handleChange = changed || moved;
          const handleExit = stopped || (moved && changed);

          // Cancel when suggestion isn't active
          if (!handleStart && !handleChange && !handleExit) {
            return;
          }

          const state = handleExit && !handleStart ? prev : next;
          const decorationNode = view.dom.querySelector(`[data-decoration-id="${state.decorationId}"]`);

          props = {
            editor,
            range: state.range,
            query: state.query,
            text: state.text,
            items: [],
            command: (commandProps) => {
              return command({
                editor,
                range: state.range,
                props: commandProps,
              })
            },
            decorationNode,
            // virtual node for positioning
            // this can be used for building popups without a DOM node
            clientRect: decorationNode
              ? () => {
                  // because of `items` can be asynchrounous we’ll search for the current decoration node
                  const { decorationId } = this.key?.getState(editor.state); // eslint-disable-line
                  const currentDecorationNode = view.dom.querySelector(`[data-decoration-id="${decorationId}"]`);

                  return currentDecorationNode?.getBoundingClientRect() || null;
                }
              : null,
          };

          if (handleStart) {
            renderer?.onBeforeStart?.(props);
          }

          if (handleChange) {
            renderer?.onBeforeUpdate?.(props);
          }

          if (handleChange || handleStart) {
            props.items = await items({
              editor,
              query: state.query,
            });
          }

          if (handleExit) {
            renderer?.onExit?.(props);
          }

          if (handleChange) {
            renderer?.onUpdate?.(props);
          }

          if (handleStart) {
            renderer?.onStart?.(props);
          }
        },

        destroy: () => {
          if (!props) {
            return;
          }

          renderer?.onExit?.(props);
        },
      }
    },

    state: {
      // Initialize the plugin's internal state.
      init() {
        const state = {
          active: false,
          range: {
            from: 0,
            to: 0,
          },
          query: null,
          text: null,
          composing: false,
        };

        return state;
      },

      // Apply changes to the plugin state from a view transaction.
      apply(transaction, prev, _oldState, state) {
        const { isEditable } = editor;
        const { composing } = editor.view;
        const { selection } = transaction;
        const { empty, from } = selection;
        const next = { ...prev };

        next.composing = composing;

        // We can only be suggesting if the view is editable, and:
        //   * there is no selection, or
        //   * a composition is active (see: https://github.com/ueberdosis/tiptap/issues/1449)
        if (isEditable && (empty || editor.view.composing)) {
          // Reset active state if we just left the previous suggestion range
          if ((from < prev.range.from || from > prev.range.to) && !composing && !prev.composing) {
            next.active = false;
          }

          // Try to match against where our cursor currently is
          const match = findSuggestionMatch({
            char,
            allowSpaces,
            allowToIncludeChar,
            allowedPrefixes,
            startOfLine,
            $position: selection.$from,
          });
          const decorationId = `id_${Math.floor(Math.random() * 0xffffffff)}`;

          // If we found a match, update the current state to show it
          if (
            match &&
            allow({
              editor,
              state,
              range: match.range,
              isActive: prev.active,
            })
          ) {
            next.active = true;
            next.decorationId = prev.decorationId ? prev.decorationId : decorationId;
            next.range = match.range;
            next.query = match.query;
            next.text = match.text;
          } else {
            next.active = false;
          }
        } else {
          next.active = false;
        }

        // Make sure to empty the range if suggestion is inactive
        if (!next.active) {
          next.decorationId = null;
          next.range = { from: 0, to: 0 };
          next.query = null;
          next.text = null;
        }

        return next;
      },
    },

    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(view, event) {
        const { active, range } = plugin.getState(view.state);

        if (!active) {
          return false;
        }

        return renderer?.onKeyDown?.({ view, event, range }) || false;
      },

      // Setup decorator on the currently active suggestion.
      decorations(state) {
        const { active, range, decorationId } = plugin.getState(state);

        if (!active) {
          return null;
        }

        return DecorationSet.create(state.doc, [
          Decoration.inline(range.from, range.to, {
            nodeName: decorationTag,
            class: decorationClass,
            'data-decoration-id': decorationId,
          }),
        ]);
      },
    },
  });

  return plugin;
}
