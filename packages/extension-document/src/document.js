import { Node } from '@kameo/core';

export const Document = Node.create({
  name: 'doc',
  topNode: true,
  content: 'block+',
});
