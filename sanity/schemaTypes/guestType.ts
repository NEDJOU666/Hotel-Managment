

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'guest',
  title: 'Guest',
  type: 'object',
  fields: [
    defineField({
      name: 'age',
      title: 'Age',
      type: 'string', // Use string if you want to store ages with leading zeros; otherwise, use 'number'
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
});
